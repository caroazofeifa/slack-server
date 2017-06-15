const express = require('express');
const routes = require('./routes/');
const bodyParser = require('body-parser');

// setup server
const app = express();

// Allow CORS
app.use(allowCORS)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

function allowCORS(_, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header(
    'Access-Control-Allow-Headers',
    'Content-type, Authorization'
  );
  next();
}
module.exports = app;
