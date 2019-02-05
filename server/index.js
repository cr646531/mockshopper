const express = require('express');
const bodyParser = require('body-parser');

const {syncAndSeed} = require('./models/index')

const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const lineItemRouter = require('./routes/lineItemRoutes');
const imageRouter = require('./routes/imageRoutes');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path')

app.listen(port, () => {
  console.log(`listening on port ${port}`)
  syncAndSeed();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use('/dist', express.static(path.join(__dirname, '../dist')))


// Static Middleware
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/products', productRouter);
app.use('/api/lineItems', lineItemRouter);
app.use('/api/cart', cartRouter);
app.use('/api/images', imageRouter);


module.exports = app;
