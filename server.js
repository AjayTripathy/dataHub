var express = require('express');
var app = express.createServer();
var fileUpload = require('./controllers/file-upload.js');
var web = require('./controllers/web.js');

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


app.post('/findDataSets', function(req, res){ });

app.post('/getDataSet', function(req, res){ });

app.get('/', web.home);
app.get('/sets/create', web.create);
app.get('/user/login', web.login);

app.listen(3000);
