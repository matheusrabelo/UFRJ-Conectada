var _ = require('lodash');
var mime = require("mime");
var fs = require("fs");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//file paths
var path_404 = '';
var path_index = 'index.ejs';

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

app.set('view engine', 'ejs');

//api routes
var api_routes = require("./routes/api_routes");
app.use('/api', api_routes);

//front routes
//var front_routes = require("./routes/front_routes");
app.use(express.static(__dirname + '/views'));
//app.use('/', front_routes);

//index
app.get('/', function(req, res){
  res.render(path_index);
});

//404
app.get('*', function(req, res){
  res.render(path_404);
});

app.listen(process.env.PORT || 3000);
