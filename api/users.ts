// modules
import express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let crypto = require('crypto');

// model
let User = mongoose.model('User', {
  username: String,
	email: String,
	passwordHash: String,
	salt: String
});

// POST
router.post('/users', function(req, res){
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

export = router;
