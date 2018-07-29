var express = require('express');
var passport = require('passport');
var UserController = require('../controllers/user.controller');

var router = express.Router();

/* GET users listing. */

router.post('/register', UserController.addUser);
router.post('/authenticate', UserController.authenticate);
router.get('/profile', passport.authenticate('jwt', {session : false}), UserController.profile);
// router.post('/userById', UserController.getUserById);

module.exports = router;
