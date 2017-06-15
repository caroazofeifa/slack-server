const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Chat = new Schema({
  name: String,
  users: [],
  messages: [],
});

module.exports = mongoose.model('Chat', Chat);
