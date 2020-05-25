//Code permettant d'aller chercher les différentes entrées et sorties des élèves de la garderie et de les afficher sous forme de tableau

var express = require('express');
var router = express.Router();
const request = require('request');
const requestListeEleve = require('request');
var dateChar;
var heureChar;
var semaineCharDebut;
var semaineCharFin;

//Récupère la date et l'heure du jour
function temps() {
    var ts = Date.now();

    var currentDate = new Date(ts);
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
    semaineCharDebut = year+ "-" + month + "-" + (day-currentDate.getDay()+1);
    semaineCharFin = year+ "-" + month + "-" + (day-currentDate.getDay()+5);

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
    var semaineDemandee = req.query.semaine;
    var semaineAfficheeDebut;
    var semaineAfficheeFin;
    if(typeof semaineDemandee!="undefined") {
        var jourDemande = new Date(semaineDemandee);
        var jourSemaine = jourDemande.getDate();
        var yearSemaine = jourDemande.getFullYear();
        var monthSemaine = jourDemande.getMonth()+1;
        var jourSemaineCorrige = (jourSemaine-jourDemande.getDay()+1);
        if(monthSemaine<10){
            monthSemaine="0"+monthSemaine;
        }
        if(jourSemaineCorrige<10){
            jourSemaineCorrige="0"+jourSemaineCorrige;
        }
        semaineAfficheeDebut = yearSemaine + '-' + monthSemaine + '-' + jourSemaineCorrige;
        semaineAfficheeFin = yearSemaine + '-' + monthSemaine + '-' + (jourSemaine-jourDemande.getDay()+5);

    }
    else{
        semaineAfficheeDebut = semaineCharDebut;
        semaineAfficheeFin = semaineCharFin;
    }



    //Constante liste élèves
    var eleves=[];
    const optionListeEleve = {
        url: 'http://localhost:3000/api/v1/eleves',
        method: 'GET'
    };
    requestListeEleve(optionListeEleve, function(errListeEleve, resListeEleve, dataListeEleve) {
        var jsonListeEleve = JSON.parse(dataListeEleve)['response'];
        for (let i = 1; i < jsonListeEleve.length; i++) {
            eleves.push({
                id: jsonListeEleve[i]['idEleve'],
                nom: jsonListeEleve[i]['nomEleve'],
                prenom: jsonListeEleve[i]['prenomEleve']
            });
        }
    });

    // Affichage le tableau de la garderie
    const optionsEntreeGarderie = {
        url : 'http://localhost:3000/api/v1/garderie?semaine='+semaineAfficheeDebut+'&finSemaine='+semaineAfficheeFin,
        method : 'GET'
    };
    var garderie=[];
    request(optionsEntreeGarderie, function(errEntreeGarderie, resEntreeGarderie, dataEntreeGarderie) {
        var jsonEntreeGarderie = JSON.parse(dataEntreeGarderie)['response'];
        var currentId = 0;
        var currentGarderie = -1;
        for (let i = 0; i < jsonEntreeGarderie.length; i++) {
            if (currentId == jsonEntreeGarderie[i]['idEleve']) {
                switch (jsonEntreeGarderie[i]['jour']) {
                    case 1:
                        if (jsonEntreeGarderie[i]["heure"] < "12:00") {
                            garderie[currentGarderie]['jour']['LundiM'] = jsonEntreeGarderie[i]["heure"];
                        }
                        else {
                            garderie[currentGarderie]['jour']['LundiS'] = jsonEntreeGarderie[i]["heure"];
                        }
                        break;
                    case 2:
                        if (jsonEntreeGarderie[i]["heure"] < "12:00") {
                            garderie[currentGarderie]['jour']['MardiM'] = jsonEntreeGarderie[i]["heure"];
                        }
                        else {
                            garderie[currentGarderie]['jour']['MardiS'] = jsonEntreeGarderie[i]["heure"];
                        }
                        break;
                    case 3:
                        if (jsonEntreeGarderie[i]["heure"] < "12:00") {
                            garderie[currentGarderie]['jour']['MercrediM'] = jsonEntreeGarderie[i]["heure"];
                        }
                        else {
                            garderie[currentGarderie]['jour']['MercrediS'] = jsonEntreeGarderie[i]["heure"];
                        }
                        break;
                    case 4:
                        if (jsonEntreeGarderie[i]["heure"] < "12:00") {
                            garderie[currentGarderie]['jour']['JeudiM'] = jsonEntreeGarderie[i]["heure"];
                        }
                        else {
                            garderie[currentGarderie]['jour']['JeudiS'] = jsonEntreeGarderie[i]["heure"];
                        }
                        break;
                    case 5:
                        if (jsonEntreeGarderie[i]["heure"] < "12:00") {
                            garderie[currentGarderie]['jour']['VendrediM'] = jsonEntreeGarderie[i]["heure"];
                        }
                        else {
                            garderie[currentGarderie]['jour']['VendrediS'] = jsonEntreeGarderie[i]["heure"];
                        }
                        break;
                }
            }
            else {
                currentId = jsonEntreeGarderie[i]['idEleve'];
                garderie.push({
                    nomEleve: jsonEntreeGarderie[i]['nomEleve'],
                    prenomEleve: jsonEntreeGarderie[i]['prenomEleve'],
                    annee: jsonEntreeGarderie[i]['annee'],
                    jour: {
                        LundiM: "/",
                        LundiS: "/",
                        MardiM: "/",
                        MardiS: "/",
                        MercrediM: "/",
                        MercrediS: "/",
                        JeudiM: "/",
                        JeudiS: "/",
                        VendrediM: "/",
                        VendrediS: "/"
                    }
                });
                i--;    //Revient au nouvel élève pour compléter le tableau "jour"
                currentGarderie++;      //Incrémente l'idGarderie pour parcourir le tableau qu'on envoit
            }
        }
        res.render('garderie', {garderieTableau:garderie, dateActuelle:dateChar, heureActuelle:heureChar, listeNoms:eleves, semaineAfficheeDebut:semaineAfficheeDebut});
    });
});


module.exports = router;

