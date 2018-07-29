var UserService = require('../services/user.service');
var jwt = require('jsonwebtoken');
var User = require('../models/user.model');
var config = require('../config/database');

exports.getUserById = async function(req, res, next){
  // let userId = req.body.id;
  // try{
  //   let result = await UserService.getUserById(userId);
  //   return res.status(200).json({
  //     status : 200,
  //     msg : "Tere Bhai me bhi dum hai",
  //     user : result
  //   });
  // }
  // catch(e)
  // {
  //   return res.status(400);
  // }
}
exports.getUserByUsername = async function(req, res, next){

}

exports.addUser = async function(req, res, next){
  let newUser = new User({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email,
    password : req.body.password
  });
  try{
    if(await UserService.getUserByUsername(newUser.username)){
      return res.json({
        success : false,
        msg : 'Username is not available'
      });
    }
    else if(await UserService.getUserByEmail(newUser.email)){
      return res.json({
        success : false,
        msg : 'User is already registered with this Email address'
      });
    }
    else{
      let addedUser = await UserService.addUser(newUser);
      return res.json({
        success : true,
        msg : 'Succesfully Created User'
      });
    }
  }
  catch(e)
  {
    return res.status(400).json({
      success: false,
      msg : e.message
    });
  }
}

exports.authenticate = async function(req, res, next){
  const username = req.body.username;
  const password = req.body.password;
  try{
    let user = await UserService.getUserByUsername(username);
    if(!user)
    {
      return res.json({
        success : false,
        msg : 'User not found'
      })
    }
    let isMatch = await UserService.comparePassword(password, user.password)
    if(isMatch){
      const token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn : 604800  //(token expiration time in seconds) //1week = 604800sec
      });
      return res.json({
        success : true,
        token : 'JWT ' + token,
        user : {
          id : user._id,
          name : user.name,
          username : user.username,
          email : user.email
        }
      });
    }
    else{
      return res.json({
        success : false,
        msg : 'Wrong Password'
      })
    }
  }
  catch(err){
    throw err;
  }
}

exports.profile = function(req, res, next){
  res.json({
    user : req.user
  })
}
