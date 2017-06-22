const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Chat = require('../models/Chat');

exports.getChat = (req, res) => {
  // console.log('Get chat');
  Chat.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};

exports.postChat = (req, res) => {
  // console.log('Create chat!!!!', req.body);
  const id= new ObjectID();
  const newChat = new Chat({
    _id: id,
    user1: req.body.user1,
    user2: req.body.user2,
    messages:req.body.messages 
  });
  console.log(newChat);
  newChat.save(err => {
    if (err) {
      res.status(404);
      res.json(err);
    } else {
      res.status(201);
      res.json(newChat);
    }
  });
};

exports.putChat = (req, res) => {
  // console.log('Update chat BODY',req.body);
  // console.log('PARAMS',req.params.id);
  Chat.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (!err) {
      res.status(201).json({});
    } else {
      res.status(500).json({});
    }
  });
};
