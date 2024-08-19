const {User, validateRestPassword} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

/**
 * @desc Get forget password view
 * @route /password/forget-password
 * @method GET
 * @access public
 */
module.exports.getForgetPasswordView = (req, res) => {
  try{
    res.render('forget-password');
  } catch(error) {
    console.log(error)
    return res.status(500).json({message: "server error..."});
  }
}

/**
 * @desc sent forget password link
 * @route /password/forget-password
 * @method POST
 * @access public
 */
module.exports.sentForgetPasswordLink = async(req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(404).json({message: "User not found"});

  //Generate token expire after 10 min or after password changes
  const secret = process.env.SECRETE_KEY + user.password;
  const token = jwt.sign({email: user.email, id: user.id}, secret, {expiresIn: '10m'});

  //sent link to user in email
  const link = `http://localhost:${process.env.PORT}/password/rest-password/${user._id}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS
    }
  });

  const mailOption = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Rest Password",
    html: `<div>
            <h3>Click below to rest your password</h3>
            <p>${link}</p>
          </div>`
  }

  transporter.sendMail(mailOption, function(error, success){
    if(error){
      console.log(error);
    } else{
      console.log(success.response);
      res.render('link-send');
    }
  })
}

/**
 * @desc sent rest password view
 * @route /password/rest-password/:userId/:token
 * @method GET
 * @access public
 */
module.exports.getRestPasswordView = async(req, res) => {
  const user = await User.findById(req.params.userId);
  if(!user) return res.status(404).json({message: "User not found"});

  const secret = process.env.SECRETE_KEY + user.password;
  try{
    jwt.verify(req.params.token, secret);
    res.render('rest-password', {email: user.email});
  } catch(error){
    console.log(error);
    res.json({message: "Error...."});
  }
}

/**
 * @desc rest password method
 * @route /password/rest-password/:userId/:token
 * @method POST
 * @access public
 */
module.exports.RestPassword = async(req, res) => {
  const { error } = validateRestPassword(req.body.password)
  if(error) return res.status(400).json({message: error.details[0].message});

  const user = await User.findById(req.params.userId);
  if(!user) return res.status(404).json({message: "User not found"});

  const secret = process.env.SECRETE_KEY + user.password;
  try{
    jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user.password = req.body.password;

    await user.save()

    res.render('success-rest');
  } catch(error){
    console.log(error);
    res.json({message: "Error...."});
  }
}
