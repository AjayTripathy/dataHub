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

exports.checkPermission = function(permission){
	var userLoggedIn = function(req, res, next){
		if ( ! req.session.user){
			res.redirect('/login')
		}
		else if (req.session.user && (! req.session.user.permissions[permission])){
			res.send(403);
		}
		else if (req.session.user && req.session.user.permissions[permission]){
			next();
		}
		
	}
	return userLoggedIn;
}
