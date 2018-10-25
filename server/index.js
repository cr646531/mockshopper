const express = require('express');
const bodyParser = require('body-parser');
const { syncAndSeed } = require('../models/seed');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

syncAndSeed();

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// ADD STATIC FILES

// ROUTING
app.use('/api', require('./routes'));


module.exports = app;
