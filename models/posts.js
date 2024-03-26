const mongoose = require('mongoose');

const post = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  pic: {
    type: String
    
  }
});

module.exports = mongoose.model('Post', post);
