var express = require('express');
var router = express.Router();
const request = require('request');





/* GET home page. */
router.get('/', function(req, res, next) {

    const option = {
        url: 'http://localhost:3000/api/v1/init',
        method: 'GET'
    };

    request(option, function (err, res2, data){

       res.render('index');
    });
});

module.exports = router;
