'use strict';
var session = require('express-session');
var app = require('express')();
var path = require('path');
var passport = require('passport');

app.use(require('./logging.middleware'));

app.use(session({
	secret: 'seeeeeeecret!!!'
}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

app.use(passport.initialize());

app.use(passport.session());

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
