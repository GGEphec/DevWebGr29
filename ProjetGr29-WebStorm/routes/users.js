var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ecole'
});

var app = express();
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

router.get('/', function(req, res, next) {
  var page = url.parse(req.url).pathname;
  var param = querystring.parse(url.parse(req.url).query);

 if(param.username == 'root') {
   res.render('users', {title: 'Users', nom : param.username});
 }
});

/*app.post('/auth', function(request, response) {
  var username = param.username;
  var password = param.password;
  if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  }
});*/

module.exports = router;
