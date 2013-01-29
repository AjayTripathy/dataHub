var express = require('express');

var app = express();

var async = require('async');


var http = require('http');
var server = http.createServer(app);
var sio = require('socket.io');
var io = sio.listen(server);


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());







app.post('/uploadDataSetToStorage', fileUpload.uploadDataSetToStorage);
app.post('/addDataSetFromHotlink', fileUpload.addDataSetFromHotlink);

app.post('/modifyMetaData', fileUpload.modifyMetaData);


app.post('/findDataSets', function(req, res){
    
});

app.post('/getDataSet', function(req, res){
    
});
