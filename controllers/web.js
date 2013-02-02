var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MetaData = db.collection('MetaData');

exports.home = function(req, res) {
  res.render('home');
};

exports.create = function(req, res) {
  res.render('create');
};

exports.register = function(req, res) {
  res.render('register');
};

exports.login = function(req, res) {
  res.render('login');
};
