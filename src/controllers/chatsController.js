const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Chat = require('../models/Chat');

exports.getChats = (req, res) => {
  console.log('View Chats');
  Chat.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};
