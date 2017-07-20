'use strict';

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var User = require('./server/model/user.model');

// Setup server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'))
var server = http.createServer(app);
// config DB
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/iot', {
//   useMongoClient: true
// });

mongoose.connect('mongodb://admin:123456@ds139655.mlab.com:39655/iot', {
  useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error: '));
db.once('open', function() {
  console.log('DB connection success! ');
});


app.post('/login', function (req, res) {
  var reqUser = req.body;
  User.findOne({'username': reqUser.username}, (err, data) => {
    if (err) {
      res.json({success: false, message: "Server Error"});
    }
    if (data) {
      if (data.password === reqUser.password) {
        res.json({success: true});
      } else {
        res.json({success: false, message: "Invalid password"});
      }
    } else {
      res.json({success: false, message: "Invalid username!"});
    }
  })
})

// Start server
function startServer() {
   var port = process.env.PORT || 9000;
   var ip = process.env.IP || '0.0.0.0';
    server.listen(port, ip, function () {
        console.log('Express server listening on %d', port);
    });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
