require('dotenv').config();// loads environment variables from a .env file into process.env.
//express
const express = require('express');// web framework for node.
const app = express();
//server
const http = require('http');
const server = http.createServer(app)
//socket
const io = require('socket.io').listen(server);
//authentication
const logger = require('morgan');//HTTP request logger middleware for node.js
const bodyParser = require('body-parser');// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// const path = require('path');
//DB
const mongoose = require('mongoose');// MongoDB object modeling tool designed to work in an asynchronous environment.
//local
const router = require('./router');  
const configA = require('../config/main');

mongoose.Promise = global.Promise;
const uristring = process.env.DB || 'localhost:27017/slack';

//MONGO
mongoose.connect(configA.database)
.then(
  () => console.log('Connected to MongoDB'),
  error => console.log(`Error to connect with MongoDB.\nDetails: ${error}`)
);

//START LISTENING
server.listen(configA.port);
console.log(`Started on port ${configA.port}`);

//AUTHENTICATION
app.use(logger('dev')); // Log requests to API using morgan
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  

app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

router(app);  

//SOCKET
var usernames = {};
var connections =[];

io.sockets.on('connection', function (socket) {
  socket.on('register', function(name) {
    connections[name] = socket.id;
  });
  //socket.emit('sendchat', idMessageFor, data, time, idMessageFrom);
  socket.on('sendchat', (idMessageFor, data, time, idMessageFrom,username,idMessage) => {

    if(connections[idMessageFor]!=socket.id){
      io.to(connections[idMessageFor]).emit('updatechat', idMessageFor, data, time, idMessageFrom,username,idMessage);      
    }
  });
  socket.on('sendchannel', (idMessageFor, data, time, idMessageFrom,username,idMessage) => {
    //socket.broadcast.emit('updatechat', id, data, time,idM,name );
    socket.broadcast.emit('updatechannel', idMessageFor, data, time, idMessageFrom,username,idMessage);
  });
  socket.on('adduser', function(username){
    socket.username = username;
    usernames['username'] = username;
    io.sockets.emit('updateusers', usernames);
  });
  socket.on('disconnect', function(){
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
  });
});

