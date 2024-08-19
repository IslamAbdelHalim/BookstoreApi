const bcrypt = require('bcryptjs')
const {User, ValidateUpdateUser} = require('../models/User');

/**
 * @desc get All User
 * @routes /auth/users
 * @method GET
 * @access privet only admin
 */
const getAllUsers = async(req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

/**
 * @desc get User By Id
 * @routes /auth/users/:id
 * @method GET
 * @access privet only admin and User himself
 */
const getUserById = async(req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.status(200).json(user);
  } catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

/**
 * @desc update User
 * @routes /auth/users/:id
 * @method PUT
 * @access privet only admin
 */
const updateUser = async(req, res) => {
  const { error } = ValidateUpdateUser(req.body);
  if(error)
    return res.status(400).json({message: error.details[0].message});

  try {
    if(req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true}).select('-password');
    res.status(200).json(user);
  } catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

/**
 * @desc Delete user
 * @routes /auth/users/:id
 * @method Delete
 * @access privet only admin and User himself
 */
const deleteUser = async(req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({message: "User Deleted successfully"});
    } else {
      return res.status(404).json({message: "User not Found"});
    }
  } catch(error){
    console.log(error);
    res.status(500).json({message: "server error"});
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}