const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Channel = require('../models/Channel');

exports.getChannel = (req, res) => {
//   console.log('Get channel');
  Channel.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};

exports.postChannel = (req, res) => {
//   console.log('Create channel');
  const id= new ObjectID();
  const newChannel = new Channel({
    _id: id,
    name: req.body.name,
    messages:req.body.messages 
  });
  // console.log(newChannel);
  newChannel.save(err => {
    if (err) {
      res.status(404);
      res.json(err);
    } else {
      res.status(201);
      res.json(newChannel);
    }
  });
};

exports.putChannel = (req, res) => {
//   console.log('Update chat BODY');
  // console.log('PARAMS',req.params.id);
  Channel.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (!err) {
      res.status(201).json({});
    } else {
      res.status(500).json({});
    }
  });
};
