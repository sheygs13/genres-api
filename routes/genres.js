const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  Genre.find()
  .then(
    genres => res.status(200).send(genres)
  )
  .catch(
    error => res.status(400).json({message: error.message})
  )
});

router.get('/:id', (req,res) => {
  const { id } = req.params;
  Genre.findById(id)
       .then(
         (genre) => {
          if (!genre) { 
            return res.status(404).json({message: 'Genre with specific ID not found'});
          }  
          return res.status(200).send(genre);
         }
       )
       .catch(
         error => res.status(400).send(error.message)
       )
});

router.post('/', auth, (req,res) => {
 const { name } = req.body;
 const { error } = validate({ name });
 if (error) return res.status(400).send(error['details'][0].message)
 const genre = new Genre ({ name });
 genre.save()
      .then(
        (genre) => res.status(201).send(genre)
      )
      .catch(
        error => res.status(400).send(error.message)
      )

});

router.put('/:id', (req,res) => {
const { id } = req.params;
const { name } = req.body;
const { error } = validate({ name });
if (error) return res.status(400).send(error['details'][0].message);
Genre.findByIdAndUpdate(id, { name }, { new: true })
      .then(
        (genre) => {
           if (!genre){
             return res.status(404).json({message: 'Genre not Found'});
           }  
           return res.status(200).send(genre);
        } 
      )
      .catch(
         error => res.status(400).send(error.message)
      )
});

router.delete('/:id', [auth, admin], (req,res) => {
 const { id } = req.params;
 Genre.findByIdAndRemove(id)
     .then(
       (genre) => {
         if (!genre){
          return res.status(404).json({message: 'Genre not Found'});
         }  
         res.status(204).send(genre);
       }
     )
     .catch(
       error => res.status(400).send(error.message)
     )
 
});

module.exports = router;