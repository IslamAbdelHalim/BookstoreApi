const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');

//User Schema

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  username: {
    type: String,
    require: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {timestamp: true});

// create method for create token
UserSchema.methods.generateToken = function () {
  return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.SECRETE_KEY)
}

//user model
const User = mongoose.model('User', UserSchema);


//validate Register User
function ValidateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    username: Joi.string().trim().min(3).max(20).required(),
    password: passwordComplexity().required(),
  });

  return schema.validate(obj);
}

//validate login User
function ValidateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(20).required(),
  });

  return schema.validate(obj);
}

//validate Update User
function ValidateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().email(),
    username: Joi.string().trim().min(3).max(20),
    password: passwordComplexity(),
  });

  return schema.validate(obj);
}

//validate Rest Password
function validateRestPassword(obj) {
  const schema = Joi.object({
    password: passwordComplexity().require()
  });

  return schema.validate(obj);
}

module.exports = {
  User,
  ValidateRegisterUser,
  ValidateLoginUser,
  ValidateUpdateUser,
  validateRestPassword
}