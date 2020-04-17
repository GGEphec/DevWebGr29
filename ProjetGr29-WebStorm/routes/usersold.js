var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
/* GET home page. */

    const option = {
        url: 'http://localhost:3000/api/v1/login',
        method: 'GET'
    };

request(option, function(err, res2, data) {
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



module.exports = router;