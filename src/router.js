const express = require('express');
const passport = require('passport');

const authenticationController = require('./controllers/authenticationController');
const userController = require('./controllers/usersController');
const chatsController = require('./controllers/chatsController');
const messagesController = require('./controllers/messagesController');
const channelController = require('./controllers/channelsController');

const passportService = require('../config/passport');

const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  

function routes(app) {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  authRoutes.post('/register', authenticationController.register);

  authRoutes.post('/login', requireLogin, authenticationController.login);
  
  //USER INFORMATION
  apiRoutes.get('/users',userController.getUsers);
  apiRoutes.get('/user',userController.getUser);
  //CHATS
  apiRoutes.put('/chats/:id',chatsController.putChat);
  apiRoutes.post('/chats',chatsController.postChat);
  apiRoutes.get('/chats',chatsController.getChat);
  //CHANNELS
  apiRoutes.put('/channels/:id',channelController.putChannel);
  apiRoutes.post('/channels',channelController.postChannel);
  apiRoutes.get('/channels',channelController.getChannel);
  //MESSAGES
  apiRoutes.put('/messages/:id',messagesController.putMessage);
  apiRoutes.post('/messages',messagesController.postMessage);
  apiRoutes.get('/messages',messagesController.getMessages);
  apiRoutes.get('/message',messagesController.getMessage);

  app.use('/api', apiRoutes);
}

module.exports =routes;