var express = require('express');
var bodyParser = require('body-parser');
var blogdata = require('./blog.json');


var app = express()

var router = require('./router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/V1', router);


var server = app.listen(4242, function() {
  var host = server.address().address;
  var port = server.address().port;
});
console.log(`Server started at ` + server.address().port);
