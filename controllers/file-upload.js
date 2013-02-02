var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MetaData = db.collection('MetaData');
var Users = db.collection('Users');
var validate = require('../lib/validate');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');



var doInsert = function(toInsert , res){
    MetaData.insert(toInsert, function(err, data){
        if (err){
           throw(err);
        } 
        var result = data[0];
        result['_id'] = result['_id'].toString();
        res.send({'status': 'ok', 'dataId': result['_id']});
    });
}

var doInsertIfValid = function(metadata, file, res){
    
    isValidFile = validate.validateFile(file, metadata);
    if(isValidFile){
        doInsert(metadata, res);
    }
    else{
        res.send({'status': 'error', 'msg': 'invalid file'});
    }
}


var constructMetadataFromReq = function(req, isHotlinked){
    var tableTitle = req.body.tableTitle;
    var columnNames = req.body.columnNames;
    var uploaderId = req.body.userId;
    var rss = req.body.rss;
    var format = req.body.format;
    var tags = req.body.tags;
    var source = req.body.source;
    var updateFrequency = req.body.updateFrequency;
    var metadata =  {
                        'tableTitle': tableTitle,
                        'columnNames': columnNames,
                        'uploaderId': uploaderId,
                        'rss': rss,
                        'isHotLinked': isHotlinked,
                        'format': format,
                        'tags': tags,
                        'source': source, 
                        'updateFrequency': updateFrequency,
                        'upvotes': 1
                    };
    return metadata
}

var getFileThenInsertIfValid = function(hotlink, metadata, res){
    //TODO: Actually fetch the file for validation. The following two lines should happen in the callback to that file fetch.
    var file = null;
    metadata['location'] = hotlink;
    doInsertIfValid(metadata, file, res);

}


exports.uploadDataSetToStorage = function(req, res){
    //TODO: upload the file
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        // ...
    });
    //TODO: Do a streaming upload of the file to s3
    toInsert['location'] = "";
    doInsertIfValid(toInsert, file, res);
    res.send({'status': 'ok', 'msg': 'loading'})
};

exports.addDataSetFromHotlink = function(req, res){
    var metadata = constructMetadataFromReq(req, true);
    //go to the location, check that there is an actual file of the specified format there
    getFileThenInsertIfValid(req.body.fileLocation , metadata, res);
    //res.send({'status': 'ok', 'msg': 'loading'})

};

exports.modifyMetaData =  function(req, res){};
