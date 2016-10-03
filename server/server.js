var express = require('express');
var app = express();
var fs = require("fs");
//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {
//    response.end('It Works!! Path Hit: ' + request.url);
    var MongoClient = require('mongodb').MongoClient;

// Connection URL
    var url = 'mongodb://localhost:12345/pdata';
// Use connect method to connect to the Server

    // Find some documents

    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('data');
        collection.find({}).toArray(function (err, docs) {
            response.end(docs);
            db.close();
        });
//        response.end("Connected correctly to server");


    });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});