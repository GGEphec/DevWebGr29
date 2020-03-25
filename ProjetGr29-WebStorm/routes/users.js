var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ecole'
});

var app = express();



router.get('/', function(req, res, next) {
    res.locals.connection.query('SELECT * from eleves', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

module.exports = router;
