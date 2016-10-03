var express = require('express');
var exphbs  = require('express-handlebars');
var router = express.Router();
var app = express();

//mongo
var mongoose = require('mongoose');
var User = mongoose.model('User');
/**Mongo db ends**/

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/getFeeds', function (req, res) {
    var feeds = mongoose.model('feedData');
  //get data from feeds
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
