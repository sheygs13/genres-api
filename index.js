const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/v1/genres', genres);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));