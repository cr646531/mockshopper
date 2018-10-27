const express = require('express');
const bodyParser = require('body-parser');
const { syncAndSeed } = require('../models/seed');
const router = require('./routes/userRoutes');
const review = require('./routes/reviewRoutes');
//added morgan
const morgan = require('morgan');


const app = express();
const port = process.env.PORT || 3000;
const homepage = 'http://localhost:3000/';
const path = require('path')



app.listen(port, () => {
  console.log(`listening on port ${port}`)
  console.log(homepage);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//added morgan
app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, '../dist')));



// ADD STATIC FILES


// ROUTING
//app.use('/api', require('./routes'));



app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});



app.get('/seed', async (req, res, next) => {
  try {
      await syncAndSeed();
      res.redirect('/api');
  } catch(err) {
    console.log('something went wrong');
    next(err);
  }
});

app.use('/api/user', router);
app.use('/api/reviews', review);



module.exports = app;
