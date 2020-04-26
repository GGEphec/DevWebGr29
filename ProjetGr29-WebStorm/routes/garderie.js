var express = require('express');
var router = express.Router();
const request = require('request');
const request2 = require('request');
var dateChar;
var heureChar;

//Récupère la date et l'heure du jour
function temps() {
   var ts = Date.now();

   var currentDate = new Date(ts);
   console.log(currentDate);
   var day = currentDate.getDate();
   if (day < 10) {
      day = "0" + day;
   }
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
   const option2 = {
      url: 'http://localhost:3000/api/v1/eleves',
      method: 'GET'
   };
   request2(option2, function(err, res2, data) {
      var json2 = JSON.parse(data)['response'];
      for (let i = 0; i < json2.length; i++) {
         eleves.push({
            id: json2[i]['idEleve'],
            nom: json2[i]['nomEleve'],
            prenom: json2[i]['prenomEleve'],
            naissance: json2[i]['naissance'],
            classe: json2[i]['annee'],
            p1: json2[i]['parent1Id'],
            p2: json2[i]['parent2Id']
         });
      }
   });

// Affichage le tableau de la garderie
   const options = {
      url : 'http://localhost:3000/api/v1/garderie',
      method : 'GET'
   }
   var gard=[];
   request(options, function(err, res2, data) {
      var json = JSON.parse(data)['response'];
      for (let i = 0; i < json.length; i++) {
         // 
         gard.push({
            idGarderie: json[i]['idGarderie'],
            idEleve: json[i]['idEleve'],
            nomEleve: json[i]['nomEleve'],
            prenomEleve: json[i]['prenomEleve'],
            annee: json[i]['annee'],
            dateG: json[i]['dateoutin'],
            heure: json[i]['heure'],
            outIn: json[i]['outIn']
         });
      }
      res.render('garderie', {garderieTableau:gard, dateActuelle:dateChar, heureActuelle:heureChar, listeNoms:eleves});
   });
});

module.exports = router;

