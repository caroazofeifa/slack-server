const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chat = new Schema({
  user1: String,
  user2: String,
  messages: [],
});

module.exports = mongoose.model('Chat', Chat);
