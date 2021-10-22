const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// ---------------Autorisation des rêquetes-----------//

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// ---------------Autorisation des rêquetes-----------//

const usersRoute = require('./routes/user');
const productRoot = require('./routes/product');
const achatRoot = require('./routes/achat');

app.use(bodyParser.json());

app.use('/product', productRoot);
app.use('/user', usersRoute);
app.use('/achat', achatRoot);

app.use('/uploads', express.static('uploads'));

module.exports = app;
