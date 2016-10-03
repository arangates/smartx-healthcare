var express = require('express'),
        feeds = require('./routes/feeds');
var app = express();

app.get('/feeds', feeds.findAll);
app.get('/feeds/:id', feeds.findById);
app.post('/feeds', feeds.addFeed);
app.put('/feeds/:id', feeds.updateFeed);
app.delete('/feeds/:id', feeds.deleteFeed);

/** start the holy server **/
app.listen(3000);
console.log('Listening on port 3000...');