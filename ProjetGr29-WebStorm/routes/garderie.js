var express = require('express');
var router = express.Router();
const request = require('request');



router.get('/', function(req, res){
   const options = {
      url : 'http://localhost:3000/api/v1/garderie',
      method : 'GET'
   }

// Affichage le tableau de la garderie
   var gard=[];
   request(options, function(err, res2, data) {
      var json = JSON.parse(data)['response'];
      for (let i = 0; i < json.length; i++) {
         gard.push({
            idGarderie: json[i]['idGarderie'],
            nomEleve: json[i]['nomEleve'],
            prenomEleve: json[i]['prenomEleve'],
            annee: json[i]['annee'],
            dateG: json[i]['dateoutin'],
            heure: json[i]['heure'],
            outIn: json[i]['outIn']
         });
      }
      res.render('garderie', {garderieTableau:gard});
   });
});

module.exports = router;

