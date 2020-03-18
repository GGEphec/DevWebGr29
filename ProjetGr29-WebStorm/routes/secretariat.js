var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ecole'
});

//Initialise Express
var app = express();

//Utilisation des packages via Express
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Lancement de la page Html
app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname + '/secretariat.html'));
    res.render('secretariat');
});

//Charge les eleves
function init() {
    connection.query('SELECT nomEleve, prenomEleve, naissance, annee FROM eleves JOIN classes ON eleves.classeId = classes.idClasse', [], function (error, results, fields) {
        if (results.length > 0) {
            let tableau = "<th><tr><td>Nom</td><td>Prénom</td><td>Date de naissance</td><td>Classe</td></tr></th><tbody>";
            for(let i=0; i<results.length; i++){
                tableau+="<tr><td>"+results[i]['nomEleve']+"</td><td>"+results[i]['prenomEleve']+"</td><td>"+results[i]['naissance']+"</td><td>"+results[i]['annee']+"</td></tr>";
            }
            tableau+="</tbody>";
            //res.write(tableau);
            document.getElementById('tableEleve').innerHTML=tableau;
        }
        else {
            res.send('Erreur lors de l\'accès à la base de donnée');
        }
        res.end();
    });

}


















module.exports = router;







