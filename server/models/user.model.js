var mongoose = require('mongoose');
var config = require('../config/database');

const UserSchema = mongoose.Schema({
  name : {
    type : String,
  },
  username : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
