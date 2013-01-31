var express = require('express');

var app = express.createServer();

var fileUpload = require('./controllers/file-upload.js');
var web = require('./controllers/web.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());


app.post('/uploadDataSetToStorage', fileUpload.uploadDataSetToStorage);
app.post('/addDataSetFromHotlink', fileUpload.addDataSetFromHotlink);

app.post('/modifyMetaData', fileUpload.modifyMetaData);


app.post('/findDataSets', function(req, res){ });

app.post('/getDataSet', function(req, res){ });

app.get('/', web.home);
app.get('/sets/create', web.create);
app.get('/user/login', web.login);

app.listen(3000);
