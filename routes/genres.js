const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

const genres = [
 { id: 1, name: 'Action' },
 { id: 2, name: 'Horror' },
 { id: 3, name: 'Fantasy' }
]


router.get('/', (req, res) => {
res.send(genres);
});

router.get('/:id', (req,res) => {
  const { id } = req.params;
  const genre = genres.find(genre => genre.id === Number(id));
  if (!genre) return res.status(404).json({message: 'Genre with specific ID not found'});
  return res.status(200).send(genre);
});

router.post('/', (req,res) => {
 const { name } = req.body;
 const { error } = validateGenre({ name });
 if (error) return res.status(400).send(error['details'][0].message)
 const genre = {
   id: genres.length + 1,
   name
 };
 genres.push(genre);
 res.status(201).send(genre);
});

router.put('/:id', (req,res) => {
const { id } = req.params;
const { name } = req.body;
const genre = genres.find(genre => genre.id === Number(id));
if (!genre) return res.status(404).json({message: 'Genre not Found'});
const { error } = validateGenre({ name });
if (error) return res.status(400).send(error['details'][0].message);
genre.name = name;
res.status(200).send(genre);
});

router.delete('/:id', (req,res) => {
 const { id } = req.params;
 const genre = genres.find(genre => genre.id === Number(id));
 if (!genre) return res.status(404).json({message: 'Genre not Found'});
 const index = genres.indexOf(genre);
 genres.splice(index,1);
 res.status(204).send(genres);
});


function validateGenre(genre){
const schema = Joi.object({
   name: Joi.string().min(4).max(30).required()
});
return schema.validate(genre);
}

module.exports = router;