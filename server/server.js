var express = require('express'),
        feeds = require('./routes/feeds');
var app = express();

app.get('/api/feeds', feeds.findAll);
app.get('/api/feed/last/:id', feeds.findLast);
app.get('/api/feeds/:id', feeds.findById);
app.get('/api/feed/create/:id/:sp/:dp/:pulse/:temp', feeds.addFeed);
app.put('/api/feeds/:id', feeds.updateFeed);
app.delete('/api/feeds/:id', feeds.deleteFeed);

/** start the holy server **/
app.listen(3000);
console.log('Listening on port 3000...');