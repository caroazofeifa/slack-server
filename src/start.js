require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io').listen(server);
const logger = require('morgan');//new
const config = require('../config/config.json');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const configA = require('../config/main');
const router = require('./router');  


mongoose.Promise = global.Promise;
const uristring = process.env.DB || 'localhost:27017/slack';

//MONGO
mongoose.connect(configA.database)
.then(
  () => console.log('Connected to MongoDB'),
  error => console.log(`Error to connect with MongoDB.\nDetails: ${error}`)
);

//START LIST
server.listen(configA.port);
console.log(`Started on port ${config.port}`);

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

// // routing
// app.get('/', function (req, res) {
//   res.sendFile('http://localhost:8080/');
// });

//SOCKET
var usernames = {};

io.sockets.on('connection', function (socket) {
  console.log('st socket');
  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', (data) => {
    console.log('chat',data);
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.emit('updatechat', socket.username, data);
  });

  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    console.log('user',username);
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    console.log(usernames);
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected');
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    // update the list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});

