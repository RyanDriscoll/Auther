'use strict';

var router = require('express').Router();
var passport = require('passport');
var User = require('../users/user.model.js');
var currentUser = {};

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use('google',
  new GoogleStrategy({
    clientID: '157270259447-bbpo31mngaeged2s6ofj5savvns9nf4g.apps.googleusercontent.com',
    clientSecret: 'trR3olRLn-N5mkxsKcWYQYgn',
    callbackURL: 'http://localhost:8080/api/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // User.findOrCreate()
    console.log("!!!!!!!!token", token);
    console.log("!!!!!!!!refreshToken", refreshToken);
    console.log("!!!!!!!!profile", profile);
    done();
  })
);

router.get('/me', function(req, res, next) {
  res.json(currentUser);
});

router.get('/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/api/users', // or wherever
    failureRedirect : '/api/users' // or wherever
  })
);

router.post('/login', function(req, res, next) {
  User.findOne({where: req.body })
  .then(function(user) {
    if (user) {
      req.session.user = user;
      currentUser = user;
      res.status(200).json(user);
    } else {
      res.sendStatus(401);
    }
  })
  .catch(next);
});

router.put('/logout', function (req, res, next) {
  req.session.user = undefined;
  res.sendStatus(200);
});

module.exports = router;
