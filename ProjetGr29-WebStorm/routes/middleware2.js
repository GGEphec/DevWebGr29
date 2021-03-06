var users = require('./api');
var request = require('request');
const jwt = require('jsonwebtoken');


module.exports = function tokenCreate (req, res, next) {

    const optionMiddle = {
        url: 'http://localhost:3000/api/v1/middle?',
        method: 'GET'
    };
    request(optionMiddle, function (err, res2, results) {
        var json = JSON.parse(results)['response'];
        if(json[0] != null) {
            var token1 = json[0]['token'];
            var token2 = jwt.decode(token1);
            var username = token2.username;
            if (username == 'garderie01') {
                next();
            } else {
                res.redirect('/login');
                res.locals.connection.query('DELETE FROM token');
            }
        }
    })
};
