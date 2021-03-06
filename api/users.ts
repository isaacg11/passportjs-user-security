// import modules
import express = require('express');
import passport = require('passport');
let router = express.Router();
let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require("jsonwebtoken");

// Model
let User = mongoose.model('User', {
  username: String,
	email: String,
	passwordHash: String,
	salt: String
});

// POST - Register
router.post('/users/register', function(req, res){
  let salt = crypto.randomBytes(16).toString('hex');
  let passwordHash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64).toString('hex');

  let newUser = new User({
    username: req.body.username,
  	email: req.body.email,
  	passwordHash: passwordHash,
  	salt: salt
  });

  newUser.save((err, res) => {
    if(err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })

  res.send('Success');
});

// POST - Login
router.post('/users/login', function(req, res, next) {
  User.find({username: req.body.username}, function(err, user) {
    if(user.length < 1) {
      res.send({message: 'Incorrect username'});
    }
    else {
      let passwordHash = crypto.pbkdf2Sync(req.body.password, user[0].salt, 1000, 64).toString('hex');
      if(user[0].passwordHash === passwordHash) {
        let today:any = new Date();
        let exp:any = new Date(today);
        exp.setDate(today.getDate() + 36500);
        let token = jwt.sign({
          id: user[0]._id,
          username: user[0].username,
          exp: exp.getTime() / 1000
        }, 'SecretKey');

        res.send({message: 'Correct', jwt: token});
      }
      else {
        res.send({message: 'Incorrect password'});
      }
    }
  })
});

// export module
export = router;
