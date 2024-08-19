const joi = require('joi');
const mongoose = require('mongoose');


const BookSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 350,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  description: {
    type: String,
    maxlength: 100
  },
  price: Number
}, {timestamps: true});

const Book = mongoose.model('Book', BookSchema);


const ValidatePost = function(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(350).required(),
    author: joi.string().required(),
    description: joi.string().max(100),
    price: joi.number()
  });

  return schema.validate(obj);
}

const validateUpdate = function(obj) {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(350),
    author: joi.string(),
    description: joi.string().max(100),
    price: joi.number()
  });

  return schema.validate(obj);
}


module.exports = {
  Book,
  ValidatePost,
  validateUpdate
}