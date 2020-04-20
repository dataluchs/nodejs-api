const mongoose = require('mongoose');
const Post = require('./post');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
  },
  following: [{ type: ObjectId, ref: 'User' }],
  followers: [{ type: ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
