const express = require('express');
// const db = require('../models/db');
const { syncAndSeed } = require('../models/seed');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

syncAndSeed();

// ADD BODY PARSER

// ADD STATIC FILES

// ROUTING
app.use('/api', require('./routes'));


module.exports = app;
