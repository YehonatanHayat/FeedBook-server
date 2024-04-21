
const e = require('cors');
const mongoose = require('mongoose');

const post = new mongoose.Schema({
    content: { 
      type: String },
    author: { 
      type: String
       },
    date: { 
      type: Date, 
      default: Date.now },
    pic: { 
      type: String },
      email: {
        type: String,
        required: true,

      }
});

module.exports = mongoose.model('Post', post);
