// handle async errors by utilizing
// a generic async error from './middleware/error.js'
// without having to attach the async middleware
// on each handlers
require('express-async-errors');

const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const errorHandler = require('./middleware/errorHandler');
const { error, log }  = require('console');
const { exit } = require('process');
const express = require('express');
const app = express();
require('dotenv').config();


mongoose.connect('mongodb://localhost/movie-booking-app')
        .then(() => log('Connected to MongoDB...'))
        .catch(({ message }) => log('Could not connect to MongoDB', message));


// 0 - success
// aside 0 - failure
if (!process.env.JWT_KEY){
  error('JWT_KEY not defined');
  exit(1);
}

app.use(express.json());
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);
app.use('/api/v1/movies', movies);
app.use('/api/v1/rentals', rentals);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

// error middleware must be registered
// after all existing middleware functions
app.use(errorHandler);


const port = process.env.PORT || 6000;
app.listen(port, () => log(`Listening on port ${port}...`));