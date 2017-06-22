const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Channel = new Schema({
  name: String,
  messages: [],
});

module.exports = mongoose.model('Channel', Channel);
