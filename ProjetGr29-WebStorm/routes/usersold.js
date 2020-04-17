var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
/* GET home page. */
router.get('/', function(req, res, next) {
    var page = url.parse(req.url).pathname;
    var param = querystring.parse(url.parse(req.url).query);
    var username = param.username;
    var password = param.password;
    if (username && password) {
        res.locals.connection.query('SELECT * FROM utilisateurs WHERE login = ? and motDePasse = ?', [username,password], function(error, results, fields) {
            if (results.length> 0) { //On redirige vers la bonne page si le mdp est correct
                switch (results[0].droits){
                    case '1' :
                        res.redirect('/secretariat');
                        break;
                    case '2' :
                        res.redirect('/secretariat');
                        break;
                    case '3':
                        res.redirect('/garderie');
                        break;
                }
            }
            else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });

    }
});

module.exports = router;