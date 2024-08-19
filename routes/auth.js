const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const {User, ValidateRegisterUser, ValidateLoginUser} = require('../models/User')

/**
 * @desc Register new User
 * @route /auth/register
 * @method POST
 * @access public
*/
router.post('/register', async (req, res) => {
  const { error } = ValidateRegisterUser(req.body);
  if (error){
    return res.status(200).json({message: error.details[0].message});
  } 
  
  try {
    const user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({message: "this user is already registered"});
    }

    // create a salt
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const result = new User(req.body);
    await result.save();
    const token = result.generateToken();
    const { password, ...otherInfo} = result._doc;
    res.cookie('token', token, {httpOnly: true});
    res.status(201).json({token,...otherInfo});
  
  } catch(error){
    console.log(error);
    res.status(500).json({message: "Server Error"});
  }
});

/**
 * @desc Login user
 * @route /auth/login
 * @method POST
 * @access public
*/
router.post('/login', async (req, res) => {
  const { error } = ValidateLoginUser(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    let user = await User.findOne({email: req.body.email});

    if(!user) {
      return res.status(400).json({message: 'Invalid email or password'});
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if(isPasswordCorrect){
      const { password, ...others} = user._doc;
      const token = user.generateToken();
      res.cookie('token', token, {httpOnly: true});
      res.status(200).json({
        token: token,
        message: "logging successfully",
      user: {...others}});
    } else {
      res.status(400).json({message: "Invalid email or password"});
    }
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Server Error....."});
  }
});




module.exports = router;