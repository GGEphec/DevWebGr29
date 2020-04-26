//Code permettant d'aller rechercher les différentes détails sur un élève et ses parents

var express = require('express');
var router = express.Router();
const requestParent1 = require('request');
const requestParent2 = require('request');
const requestEleve = require('request');


router.get('/', function(req, res) {
    //Récupération des id de l'élève et ses parents
    var id = req.query.id;
    var p1 = req.query.p1;
    var p2 = req.query.p2;
    var donneesEleve=[]; //Ou on situe les données pour le rendu


    //Aller chercher les donnees du parent 1
    const optionsParent1 = {
        url: 'http://localhost:3000/api/v1/parents?id='+p1,
        method: 'GET'
    };
    requestParent1(optionsParent1, function (errParent1, resParent1, dataParent1){
        var jsonParent1 = JSON.parse(dataParent1)['response'];
        donneesEleve[0]=jsonParent1;
    });


    //Aller chercher les donnees du parent 2
    const optionsParent2 = {
        url: 'http://localhost:3000/api/v1/parents?id='+p2,
        method: 'GET'
    };
    requestParent2(optionsParent2, function (errParent2, resParent2, dataParent2){
        var jsonParent2 = JSON.parse(dataParent2)['response'];
        donneesEleve[1]=jsonParent2;
    });


    //Aller chercher les donnees de l'eleve
    const optionsEleve = {
        url: 'http://localhost:3000/api/v1/eleves?id='+id,
        method: 'GET'
    };
    requestEleve(optionsEleve, function(err, res2, dataEleve) {
        var jsonEleve = JSON.parse(dataEleve)['response'];
        donneesEleve[2]=jsonEleve;
        for(let i=0; i<10; i++){
            //TODO ralentir le chargement
        }
        res.render('eleve', {donneeEleve:donneesEleve});
    });
});

module.exports = router;

