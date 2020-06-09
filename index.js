const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/movie-booking-app')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(({ message }) => console.log('Could not connect to MongoDB', message));

app.use(express.json());
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);
app.use('/api/v1/movies', movies);
app.use('/api/v1/rentals', rentals);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));