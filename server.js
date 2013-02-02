var express = require('express');
var app = express.createServer();

var mongo = require('mongoskin');
var db = mongo.db('localhost:db27017/dataHub?auto_reconnect', {safe: true});
var MongoStore = require('connect-mongodb');
var fileUpload = require('./controllers/file-upload');

var http = require('http');
//var server = http.createServer(app);
//var sio = require('socket.io');
//var io = sio.listen(server);


var fileUpload = require('./controllers/file-upload.js');
var web = require('./controllers/web.js');
var auth = require('./controllers/auth.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());


app.use(express.session({ secret: '#yolo', maxAge : new Date(Date.now() + 2628000000)}));

app.post('/uploadDataSetToStorage', auth.checkPermission('hostedUpload'), fileUpload.uploadDataSetToStorage);
app.post('/create', auth.checkPermission('hotlinkUpload'), fileUpload.addDataSetFromHotlink);

app.post('/modifyMetaData', fileUpload.modifyMetaData);

app.post('/findDataSets', function(req, res){ });
app.post('/getDataSet', function(req, res){ });

app.get('/', web.home);
app.get('/sets/create', web.create);

app.post('/findDataSets', function(req, res){ });

app.get('/login', web.login);
app.post('/login', auth.validateLogin, auth.login);

app.get('/register', web.register);
app.post('/register', auth.validateRegistration, auth.register);

app.listen(3000);
