const AuthenticationController = require('./controllers/authenticationController');
const express = require('express');
const passportService = require('../config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  

function routes(app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

// Set url for API group routes
  app.use('/api', apiRoutes);
}

module.exports =routes;