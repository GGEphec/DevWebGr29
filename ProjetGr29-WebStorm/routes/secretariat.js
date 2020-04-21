var express = require('express');
var router = express.Router();
const request = require('request');



//Lancement de la page Html
router.get('/', function(req, res) {

    var test=[];

    const option2 = {
        url: 'http://localhost:3000/api/v1/eleves',
        method: 'GET'
    };
    request(option2, function(err, res2, data) {
        var json = JSON.parse(data)['response'];
        for (let i = 0; i < json.length; i++) {
            test.push({
                id: json[i]['idEleve'],
                nom: json[i]['nomEleve'],
                prenom: json[i]['prenomEleve'],
                naissance: json[i]['naissance'],
                classe: json[i]['annee'],
                p1: json[i]['parent1Id'],
                p2: json[i]['parent2Id']
            });
        }
        res.render('secretariat', {eleveListe:test});
    });

});


module.exports = router;

