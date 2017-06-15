const express = require('express');
const passport = require('passport');

const authenticationController = require('./controllers/authenticationController');
const passportService = require('../config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  

function routes(app) {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  authRoutes.post('/register', authenticationController.register);

  authRoutes.post('/login', requireLogin, authenticationController.login);

  app.use('/api', apiRoutes);
}

module.exports =routes;