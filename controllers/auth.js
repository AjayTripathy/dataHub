var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var Users = db.collection('Users');

exports.login = function(req, res){
	if (!req.form.isValid) {
      res.send({'status': 'error', 'msg': 'fill out the forms completely'});
      return;
    }
	Users.findOne({email: req.form.email}, function(err, result){
		if(!doc || hash.sha256(req.form.password, doc.salt) !== doc.password) {
        	res.send({'status': 'error', 'msg': 'invalid username/password combo'});
      	} 
      	else{
			result._id = result._id.toString();
			req.session.user = doc;
			res.redirect('/dashboard');
		}
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
