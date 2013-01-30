var express = require('express');
var app = express.createServer();
var async = require('async');
var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MongoStore = require('connect-mongodb');
var fileUpload = require('./controllers/file-upload');

var http = require('http');
//var server = http.createServer(app);
//var sio = require('socket.io');
//var io = sio.listen(server);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: '#yolo', store: new MongoStore({db: db.db}), maxAge : new Date(Date.now() + 2628000000)}));

var checkPermission = function(permission){
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

app.post('/uploadDataSetToStorage', checkPermission('hostedUpload'), fileUpload.uploadDataSetToStorage);
app.post('/addDataSetFromHotlink', checkPermission('hotlinkUpload'), fileUpload.addDataSetFromHotlink);

app.post('/modifyMetaData', fileUpload.modifyMetaData);


app.post('/findDataSets', function(req, res){
    
});

app.post('/getDataSet', function(req, res){
    
});
