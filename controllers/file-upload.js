exports.uploadDataSetToStorage = function(req, res){
    var metadata = constructMetadataFromReq(req, false);
    //check if the user has permissions to use our s3 bucket, then upload the actual file to s3 after validating
    Users.findById(uploaderId, function(err, result){
        if(err){
            throw err;
        }
        user = result;
        if (user.hasHostedUploadPermissions){            
            //TODO: asynchronously write the file to s3 in a streaming fashion
            //TODO: set the location to be a link to the s3 file
            toInsert.location = null;
            doInsertIfValid(toInsert, file);
        }
        else{
            res.send({'status': 'error', 'msg' :'permission denied, hotlink instead'});
        }

    });
};

exports.addDataSetFromHotlink = function(req, res){
    var metadata = constructMetadataFromReq(req, true);
    //go to the location, check that there is an actual file of the specified format there
    getFileThenInsertIfValid(req.body.fileLocation , metadata);
};

exports.modifyMetaData =  function(req, res){};
