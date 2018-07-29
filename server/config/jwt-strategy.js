var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../config/database');
var UserService = require('../services/user.service');

module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
    try{
      let user = await UserService.getUserById(jwt_payload._id);
      if(user)
        return done(null, user);
      else
        return done(null, false);
    }
    catch(err)
    {
      return done(err, false);
    }

  }));
}


// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
// opts.secretOrKey = config.secret;
//
// module.exports = new JwtStrategy(opts, async function(jwt_payload, done){
//
//   try{
//     let user = UserService.getUserById(jwt_payload._id);
//
//     if(user) return done(null, user);
//
//     else return done(null, false);
//   }
//   catch(err)
//   {
//     return done(err, false);
//   }
//
// });
