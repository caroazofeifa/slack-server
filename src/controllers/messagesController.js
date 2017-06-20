const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Message = require('../models/Message');

exports.getMessage = (req, res) => {
  // console.log('Get Message by id', req);
  Message.findById(req.query.id).exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};

exports.getMessages = (req, res) => {
  // console.log('Get Message');
  Message.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};

exports.postMessage = (req, res) => {
  // console.log('Create Message');
  const id= new ObjectID();
  const newMessage = new Message({
    _id: id,
    content: req.body.content,
    time:req.body.time, 
    owner: req.body.owner
  });
  console.log(newMessage);
  newMessage.save(err => {
    if (err) {
      res.status(404);
      res.json(err);
    } else {
      res.status(201);
      res.json(newMessage);
    }
  });
};

exports.putMessage = (req, res) => {
  // console.log('Update Message');
  Message.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (!err) {
      res.status(201).json({});
    } else {
      res.status(500).json({});
    }
  });
};