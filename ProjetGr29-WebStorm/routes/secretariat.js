var express = require('express');
var router = express.Router();
var Vue = require('vue');
const request = require('request');


var test=[];

const option2 = {
    url: 'http://localhost:3000/api/v1/eleves',
    method: 'GET'
};
request(option2, function(err, res2, data) {
    var json = JSON.parse(data)['response'];
    for (let i = 0; i < json.length; i++) {
        test.push({
            nom: json[i]['nomEleve'],
            prenom: json[i]['prenomEleve'],
            naissance: json[i]['naissance'],
            classe: json[i]['classeId']
        });
    }
});

//Lancement de la page Html
router.get('/', function(req, res) {
    res.render('secretariat', {eleveListe:test});
    console.log(test[1]['nom']);
});




module.exports = router;

