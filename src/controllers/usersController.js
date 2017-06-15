const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/User');

exports.getUsers = (req, res) => {
  console.log('View Users');
  User.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};
