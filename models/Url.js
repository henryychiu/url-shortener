const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  createdAt: { type: Date, defualt: Date.now },
  clicks: String
});

module.exports = mongoose.model('Url', urlSchema);