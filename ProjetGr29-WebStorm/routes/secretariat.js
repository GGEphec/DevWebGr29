//Code permetant de générer les données nécessaire pour la page de travail des secrétaires

var express = require('express');
var router = express.Router();
const request = require('request');


router.get('/', function(req, res) {

    var listeEleves=[];

    const option = {
        url: 'http://localhost:3000/api/v1/eleves',
        method: 'GET'
    };
    request(option, function(err, res2, data) {
        var json = JSON.parse(data)['response'];
        for (let i = 1; i < json.length; i++) { //Premier élément négligé car eleve 0
            listeEleves.push({
                id: json[i]['idEleve'],
                nom: json[i]['nomEleve'],
                prenom: json[i]['prenomEleve'],
                naissance: json[i]['naissance'],
                classe: json[i]['annee'],
                p1: json[i]['parent1Id'],
                p2: json[i]['parent2Id']
            });
        }
        res.render('secretariat', {eleveListe:listeEleves});
    });

});

module.exports = router;

