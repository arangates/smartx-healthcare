var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 12345, {auto_reconnect: true});
db = new Db('feedsdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'FeedsDB' database");
        db.collection('feeds', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'feeds' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving feed: ' + id);
    db.collection('feeds', function(err, collection) {
        collection.find({'user_id':id}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('feeds', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
exports.findLast = function(req, res) {
    var id = req.params.id;
    db.collection('feeds', function(err, collection) {
        collection.find({"user_id":id}).sort({"_id":-1}).limit(1).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addFeed = function(req, res) {
    var id = req.params.id;
    var sp = req.params.sp;
    var dp = req.params.dp;
    var pulse = req.params.pulse;
    var temp = req.params.temp;
//    var feed = req.body;
    console.log('Adding feed, id: ' +id+" sp:"+sp+" dp:"+dp+" pulse:"+pulse+" temp:"+temp );
    feed={user_id:id, systolic_pressure:sp, diastolic_pressure: dp, pulse: pulse, temperature: temp, time: Date.now()};
    console.log(feed);
    db.collection('feeds', function(err, collection) {
        collection.insert(feed, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result));
                res.send(result["insertedIds"][0]);
            }
        });
    });
}

exports.updateFeed = function(req, res) {
    var id = req.params.id;
    var feed = req.body;
    console.log('Updating feed: ' + id);
    console.log(JSON.stringify(feed));
    db.collection('feeds', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, feed, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating feed: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(feed);
            }
        });
    });
}

exports.deleteFeed = function(req, res) {
    var id = req.params.id;
    console.log('Deleting feed: ' + id);
    db.collection('feeds', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
