var User = require('../models/user.model');
var bcrypt = require('bcryptjs');

exports.getUserById = async function(id){
  try{
    let user = await User.findById(id);
    return user;
  }
  catch(e)
  {
    throw Error('User not found')
  }
};

exports.getUserByUsername = async function(username){
  const query = { username : username };
  try{
    let user = await User.findOne(query);
    return user;
  }
  catch(e){
    throw Error('User not found')
  }
};

exports.getUserByEmail = async function(email){
  const query = { email : email };
  try{
    let user = await User.findOne(query);
    return user;
  }
  catch(e){
    throw Error('User not found')
  }
}

exports.addUser = async function(newUser){
  try{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    let nUser = await User.create(newUser);
    return nUser;
  }
  catch(e){
      throw Error('U');
  }
}

exports.comparePassword = async function(password, hash){
  try{
    let res = await bcrypt.compare(password, hash);
    return res;
  }
  catch(err){
    throw err;
  }
}
