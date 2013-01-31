var express = require('express');
var form = require('express-form'),
    field = form.field;
var app = express.createServer();
var async = require('async');
var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MongoStore = require('connect-mongodb');
var fileUpload = require('./controllers/file-upload');
var login = require('./controllers/login');

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



app.post('/uploadDataSetToStorage', login.checkPermission('hostedUpload'), fileUpload.uploadDataSetToStorage);
app.post('/addDataSetFromHotlink', login.checkPermission('hotlinkUpload'), fileUpload.addDataSetFromHotlink);

app.post('/login', form(
    			field('email').required('Email', 'Please enter an email').toLower().trim().isEmail('Email address is not valid'), 
    			field('password').required('Password', 'Please enter a password')
  			), 
  			login.login
);

app.post('/modifyMetaData', fileUpload.modifyMetaData);




app.post('/findDataSets', function(req, res){
    
});

app.post('/getDataSet', function(req, res){
    
});
