const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const userSchema =  new mongoose.Schema({
   name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
   }, 
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
   type: String,
   required: true,
   minlength: 5,
   maxlength: 1024
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
  return token;
}

const User = mongoose.model('User', userSchema);


function validateUser(user) {
 const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(5).max(255).required()
 });
 return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;