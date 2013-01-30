var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var Users = db.collection('Users');

exports.login = function(req, res){
	//TODO: password shit
	Users.findOne({email: req.form.email}, function(err, result){
		result._id = result._id.toString();
		req.session.user = doc;
	});
};