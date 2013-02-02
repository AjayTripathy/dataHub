var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MetaData = db.collection('MetaData');

var parseQueryList = function(str){
	return str.split('\u2603');
}

var find = function(query){
	var keys = Object.keys(query);
	var searchObj = []
	for(var i = 0; i < keys.length; i = i + 1){
		key = keys[i];
		var miniQuery = {};
		var lst  = parseQueryList(query[key])
		if (lst.length > 1){
			if (key == 'tags' || key = 'columns'){
				miniQuery[key] = { '$all': lst};
			}
			else{
				miniQuery[key] = {'$in': lst}
			}
		}
		else{
			miniQuery[key] = {lst[0]}
		}
		searchObj.push(miniQuery);

	}
	var toFind = {$and: searchObj}
	return toFind;
}

exports.search = function(req, res){
	var query = req.query;
	toSearch = find(query)
	MetaData.find(toSearch).toArray(function(err,docs){
		for(var i = 0; i < docs.length; i = i + 1){
			var doc = docs[i];
			doc._id = doc._id.toString();
		}
		res.send({'status': 'ok', 'result': docs});
	});
}

/*

exports.findByColumnNames = function(req, res){
	colNames = req.colNames;

	MetaData.find({ { 'columnNames': { '$all': colNames} } ).toArray(function(err, docs){
		if (err){
			throw err;
		}
		res.send({'status': 'ok', 'data': docs});
	});
}

*/


exports.findByTitle = function(req, res){

	
}



exports.findByTags = function(req, res){
	tags = req.tags;

	MetaData.find({ { 'tags': { '$all': tags} } ).toArray(function(err, docs){
		if (err){
			throw err;
		}
		res.send({'status': 'ok', 'data': docs});
	});

	
}

