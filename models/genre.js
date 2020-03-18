const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = new mongoose.Schema({
 name: { 
    type: String, 
    required: true, 
    minlength: 4, 
    maxlength: 30
}
});
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre){
 const schema = Joi.object({
    name: Joi.string().min(4).max(30).required()
 });
 return schema.validate(genre);
 }

exports.Genre = Genre;
exports.validate = validateGenre;