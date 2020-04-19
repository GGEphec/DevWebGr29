var express = require('express');
var router = express.Router();
const request1 = require('request');
const request2 = require('request');
const request = require('request');


router.get('/', function(req, res) {
    var id = req.query.id;
    var p1 = req.query.p1;
    var p2 = req.query.p2;
    var test=[]; //Ou on situe les donnees pour le rendu


    //Aller chercher les donnees du parent 1
    const optionsParent1 = {
        url: 'http://localhost:3000/api/v1/parents?id='+p1,
        method: 'GET'
    };

    request1(optionsParent1, function (errParent1, resParent1, dataParent1){
        var jsonParent1 = JSON.parse(dataParent1)['response'];
        test.push(jsonParent1);
    });


    //Aller chercher les donnees du parent 2
    const optionsParent2 = {
        url: 'http://localhost:3000/api/v1/parents?id='+p2,
        method: 'GET'
    };

    request2(optionsParent2, function (errParent2, resParent2, dataParent2){
        var jsonParent2 = JSON.parse(dataParent2)['response'];
        test.push(jsonParent2);
    });


    //Aller chercher les donnees de l'eleve
    const options = {
        url: 'http://localhost:3000/api/v1/eleves?id='+id,
        method: 'GET'
    };

    request(options, function(err, res2, dataEleve) {
        var jsonEleve = JSON.parse(dataEleve)['response'];
        test.push(jsonEleve);

        //console.log(test);
        for(let i=0; i<10; i++){
            //ralentir le chargement
        }
        res.render('eleve', {donneeEleve:test});

    });

});


module.exports = router;

