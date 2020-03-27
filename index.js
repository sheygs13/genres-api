const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const config = require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();


if (!config.get('jwtPrivateKey')){
   console.error('ERROR: jwtPrivateKey not defined.');
   process.exit(1);
}

mongoose.connect('mongodb://localhost/movie-booking-app')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(error => console.log('Could not connect to MongoDB',error));

app.use(express.json());
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);
app.use('/api/v1/movies', movies);
app.use('/api/v1/rentals', rentals);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));