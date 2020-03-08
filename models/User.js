const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  urls: [{
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    createdAt: { type: Date, defualt: Date.now },
    clicks: String
  }]
});

module.exports = mongoose.model('User', userSchema);