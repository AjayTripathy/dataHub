var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MetaData = db.collection('MetaData');

exports.findByColumnNames = function(req, res){
	colNames = req.colNames;

	MetaData.find({ { 'columnNames': { '$all': colNames} } ).toArray(function(err, docs){
		if (err){
			throw err;
		}
		res.send({'status': 'ok', 'data': docs});
	});
}

exports.findByTitle = function(req, res){
	
}

exports.findByTags = function(req, res){
	
}

