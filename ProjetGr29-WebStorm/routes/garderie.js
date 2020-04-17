var express = require('express');
var router = express.Router();
const request = require('request');

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
         dateG: json[i]['date'],
         heure: json[i]['heure'],
         outIn: json[i]['outIn']
      });
   }
});

router.get('/', function(req, res){
   res.render('garderie', {garderieTableau:gard});
});

/*//Ajoute des lignes dans le tableau de la garderie
var mysql = require('mysql');

var con = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '',
   database : 'ecole'
});

var idGarderie = document.getElementById("idGarderie").value;
console.log(idGarderie);
var idEleve = document.getElementById("idEleve").value;
var date = document.getElementById("date").value;
var heure = document.getElementById("heure").value;
var outin = document.getElementById("outin").value;
*/
con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   //var sql = "INSERT INTO garderie (idGarderie, idEleve, date, heure, outin) VALUES (100, 10, '2020-04-01', '08h10', 'in')";
   con.query("INSERT INTO garderie (idGarderie, idEleve, date, heure, outin) VALUES (?, ?, ?, ?, ?)", [ idGarderie, idEleve, date, heure, outin], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
   });
});


module.exports = router;

