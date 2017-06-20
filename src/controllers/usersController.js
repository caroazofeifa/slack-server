const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const User = require('../models/User');

exports.getUsers = (req, res) => {
  // console.log('-->Get all Users');
  User.find().exec(function (err, data) {
    res.status(200);
    res.json(data);
  });
};

exports.getUser = (req, res) => {
  // console.log('-->Get user by id',req.query);
  User.findById(req.query.id).exec(function (err, data) {
    res.status(200);
    // res.json(data);
    res.json({'id': data._id,'email':data.email, 'profile':data.profile});
  });
};
