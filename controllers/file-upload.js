var mongo = require('mongoskin');
var ObjectID = require('mongoskin').ObjectID;
var db = mongo.db('localhost:27017/dataHub?auto_reconnect', {safe: true});
var MetaData = db.collection('MetaData');
var Users = db.collection('Users');
var validate = require('../lib/validate');



var doInsert = function(toInsert){
    MetaData.insert(toInsert, function(err, data){
        if (err){
           throw(err);
        } 
        var result = data[0];
        result['_id'] = result['_id'].toString();
        res.send({'status': 'ok', 'dataId': result['_id']});
    });
}

var doInsertIfValid = function(metadata, file){
    
    isValidFile = validate.validateFile(file, metadata);
    if(isValidFile){
        doInsert(metadata);
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
    var metadata =  {
                        'tableTitle': tableTitle,
                        'columnNames': columnNames,
                        'uploaderId': uploaderId,
                        'rss': rss,
                        'isHotLinked': isHotLinked,
                        'format': format,
                        'tags': tags,
                        'source': source 
                    };
    return metadata
}

var getFileThenInsertIfValid = function(hotlink, metadata){
    //TODO: Actually fetch the file for validation. The following two lines should happen in the callback to that file fetch.
    metadata['location'] = hotlink;
    doInsertIfValid(metadata, file);
}


exports.uploadDataSetToStorage = function(req, res){
    //TODO: upload the file
    //TODO: Do a streaming upload of the file to s3
    toInsert['location'] = "";
    doInsertIfValid(toInsert, file);
};

exports.addDataSetFromHotlink = function(req, res){
    var metadata = constructMetadataFromReq(req, true);
    //go to the location, check that there is an actual file of the specified format there
    getFileThenInsertIfValid(req.body.fileLocation , metadata);
};

exports.modifyMetaData =  function(req, res){};
