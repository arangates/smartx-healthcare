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
//                populateDB();
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

exports.addFeed = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('feeds', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateFeed = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('feeds', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteFeed = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
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
