var express = require('express');
var router = express.Router();
const https = require('https');
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/eleves',
    method: 'GET'
};


//Lancement de la page Html
router.get('/', function(req, res) {
    res.render('secretariat');
});

//Charge les eleves
function init() {
    const req = https.request(options, res => {
        console.log('statusCode: ${res.statusCode}');
    });




}


















module.exports = router;







