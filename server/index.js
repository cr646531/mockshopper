const express = require('express');
const bodyParser = require('body-parser');
const { syncAndSeed } = require('../models/seed');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const lineItemRouter = require('./routes/lineItemRoutes');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const homepage = 'http://localhost:3000/';
const path = require('path')

app.listen(port, () => {
  console.log(`listening on port ${port}`)
  console.log(homepage);
  syncAndSeed();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use('/auth/google', require('./routes/oauth')) //google oauth routing
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/products', productRouter);
app.use('/api/lineItems', lineItemRouter);
app.use('/api/cart', cartRouter);


module.exports = app;
