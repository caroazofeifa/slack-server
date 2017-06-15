const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  user: String,
  password: String,
  idNotebook: String,
});

module.exports = mongoose.model('User', User);
