const express = require('express');

const app = express();

// ADD BODY PARSER

// ADD STATIC FILES

// ROUTING
app.use('/api', require('./routes'));


module.exports = app;
