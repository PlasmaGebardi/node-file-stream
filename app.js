var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var dir = path.join(__dirname, (process.env.DIR || 'media'));

app.set('port', process.env.PORT || 1337);
app.use(express.static(dir));

app.get('/', function (req, res){
  fs.readdir(dir, (err, files) => {
    var randomFile = files[Math.floor(Math.random() * files.length)];
    console.log('Sending random file from dir: ' + randomFile);
    res.sendFile(dir + '/' + randomFile);
  });
});

app.get('/:index(\\d+)/', function(req, res){
  console.log('Sending file number: ' + req.params.index);
  fs.readdir(dir, (err, files) => {
    if (req.params.index >= files.length) { res.send('Index out of bounds'); }
    else { res.sendFile(dir + '/' + files[req.params.index]); }
  });
});

app.get('/video/:file/', function(req, res){
  console.log('Video file ' + req.params.file + ' requested');
  res.send('<video src="/' + req.params.file + '" controls> No browser support. </video>');
});

app.get('/audio/:file/', function(req, res){
  console.log('Audio file ' + req.params.file + ' requested');
  res.send('<audio src="/' + req.params.file + '" controls> No browser support. </audio>');
});

var server = app.listen(app.get('port'), function(){
  console.log('Server running on port ' + server.address().port);
  console.log('Serving path: ' + dir);
});