var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ecole'
});

//Initialise Express
var app = express();

//Utilisation des packages via Express
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Lancement de la page Html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});

// fonction permettant de demander à l'utilisateur son mot de passe en fonction de la bdd
app.post('/auth', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM utilisateurs WHERE login = ? AND motDePasse = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

app.get('/home', function(req, res) {
    if (req.session.loggedin) {
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

module.exports = router;