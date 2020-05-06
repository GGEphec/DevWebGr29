//Code permettant d'aller chercher les différentes entrées et sorties des élèves de la garderie et de les afficher sous forme de tableau

var express = require('express');
var router = express.Router();
const request = require('request');
const requestListeEleve = require('request');
var dateChar;
var heureChar;
var jour;

//Récupère la date et l'heure du jour
function temps() {
    var ts = Date.now();

    var currentDate = new Date(ts);
    console.log(currentDate);
    var day = currentDate.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    /* jour = currentDate.getDay();
    console.log(jour);
     */
    var month = currentDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = currentDate.getFullYear();
    dateChar = year + "-" + month + "-" + day;

    var heure = currentDate.getHours();
    if (heure < 10) {
        heure = "O" + heure;
    }
    var minutes = currentDate.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    heureChar = heure + ":" + minutes;
}


router.get('/', function(req, res){
    temps();

    //Constante liste élèves
    var eleves=[];
    const optionListeEleve = {
        url: 'http://localhost:3000/api/v1/eleves',
        method: 'GET'
    };
    requestListeEleve(optionListeEleve, function(errListeEleve, resListeEleve, dataListeEleve) {
        var jsonListeEleve = JSON.parse(dataListeEleve)['response'];
        for (let i = 0; i < jsonListeEleve.length; i++) {
            eleves.push({
                id: jsonListeEleve[i]['idEleve'],
                nom: jsonListeEleve[i]['nomEleve'],
                prenom: jsonListeEleve[i]['prenomEleve']
            });
        }
    });

    // Affichage le tableau de la garderie
    const optionsEntreeGarderie = {
        url : 'http://localhost:3000/api/v1/garderie',
        method : 'GET'
    };
    var garderie=[];
    request(optionsEntreeGarderie, function(errEntreeGarderie, resEntreeGarderie, dataEntreeGarderie) {
        var jsonEntreeGarderie = JSON.parse(dataEntreeGarderie)['response'];
        for (let i = 0; i < jsonEntreeGarderie.length; i++) {
            garderie.push({
                idGarderie: jsonEntreeGarderie[i]['idGarderie'],
                idEleve: jsonEntreeGarderie[i]['idEleve'],
                nomEleve: jsonEntreeGarderie[i]['nomEleve'],
                prenomEleve: jsonEntreeGarderie[i]['prenomEleve'],
                annee: jsonEntreeGarderie[i]['annee'],
                dateG: jsonEntreeGarderie[i]['dateoutin'],
                heure: jsonEntreeGarderie[i]['heure'],
                outIn: jsonEntreeGarderie[i]['outIn']
            });
        }
        res.render('garderie', {garderieTableau:garderie, dateActuelle:dateChar, heureActuelle:heureChar, listeNoms:eleves});
    });
});

module.exports = router;

