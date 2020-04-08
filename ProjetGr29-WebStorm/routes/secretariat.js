var express = require('express');
var router = express.Router();
const request = require('request');



//Lancement de la page Html
router.get('/', function(req, res) {
    res.render('secretariat');
});


//Charge les eleves 3  FONCTIONNE
const option2 = {
    url: 'http://localhost:3000/api/v1/eleves',
    method: 'GET'
};

request(option2, function(err, res, data){
    let json = JSON.parse(data);
    console.log(json['response']);

});




module.exports = router;






