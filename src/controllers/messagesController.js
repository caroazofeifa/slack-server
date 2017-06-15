const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Message = require('../models/Message');

exports.getMessages = (req, res) => {
  console.log('View Messages');
  Message.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};
