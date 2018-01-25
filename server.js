var express = require('express');

var app = express();

app.get('/', function(req, res) { 
  res.sendFile(__dirname + '/index.html')
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/node_modules/angular'));
app.use(express.static(__dirname + '/node_modules/angular-route'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/js'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});