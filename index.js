const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();


mongoose.connect('mongodb://localhost/movie-booking-app')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(error => console.log('Could not connect to MongoDB',error));

app.use(express.json());
app.use('/api/v1/genres', genres);
app.use('/api/v1/customers', customers);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));