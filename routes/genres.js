const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.status(200).send(genres);
});

router.get('/:id', async (req,res) => {
  const { id } = req.params;
  const genre = await Genre.findById(id)
  if (!genre) return res.status(404).json({message: 'Genre with specific ID not found'});
  return res.status(200).send(genre);
});

router.post('/', auth, async (req,res) => {
  const { name } = req.body;
  const { error } = validate({ name });
  if (error) return res.status(400).send(error['details'][0].message)
  let genre = new Genre ({ name });
  genre = await genre.save()
  res.status(201).send(genre)
});

router.put('/:id', async (req,res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { error } = validate({ name });
  if (error) return res.status(400).send(error['details'][0].message);
  const genre = await Genre.findByIdAndUpdate(id, { name }, { new: true })
  if (!genre) return res.status(404).json({message: 'Genre not Found'});
  return res.status(200).send(genre);
});

router.delete('/:id', [auth, admin], async (req,res) => {
 const { id } = req.params;
 const genre = await Genre.findByIdAndRemove(id)
 if (!genre) return res.status(404).json({message: 'Genre not Found'});  
 res.status(204).send(genre);
});

module.exports = router;