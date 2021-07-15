const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  jobtitle: String,
  name: String,
  email: String,
  imageUrl: String,
  education: String,
  experience: String,
  skills: String,
  languages: String,
  interests: String


},
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
