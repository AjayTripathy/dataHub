var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MetaData = db.collection('MetaData');

exports.home = function(req, res) {
  var loggedIn = !!req.session.user;
  res.render('home', {loggedIn: loggedIn});
};

exports.create = function(req, res) {
  var loggedIn = !!req.session.user;
  res.render('create', {loggedIn: loggedIn});
};

exports.register = function(req, res) {
  var loggedIn = !!req.session.user;
  res.render('register', {loggedIn: loggedIn});
};

exports.login = function(req, res) {
  var loggedIn = !!req.session.user;
  res.render('login', {loggedIn: loggedIn});
};
