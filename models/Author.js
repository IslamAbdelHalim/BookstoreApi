const mongoose = require('mongoose');
const joi = require('joi');


// create Author Schema
const AuthorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  image: {
    type: String,
    default: 'default-avatar.png'
  },
}, {
  timestamps: true,
});

const Author = mongoose.model('Author', AuthorSchema);


const validateNewAuthor = function(obj){
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(20).required(),
    lastName: joi.string().trim().min(3).max(20).required(),
    nationality: joi.string().trim().min(2).max(20).required(),
    image: joi.string().pattern(/\.{jpg|jpeg|png}$/i)
  });

  return schema.validate(obj);
}

// function that making a validate on user input to update
const validateUpdateAuthor = function(obj){
  const schema = joi.object({
    firstName: joi.string().trim().min(3).max(20),
    lastName: joi.string().trim().min(3).max(20),
    nationality: joi.string().trim().min(2).max(20),
    image: joi.string().pattern(/\.{jpg|jpeg|png}$/i)
  });

  return schema.validate(obj);
}

module.exports = {
  Author,
  validateNewAuthor,
  validateUpdateAuthor,
};