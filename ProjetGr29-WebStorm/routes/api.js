var express = require('express');
var router = express.Router();
var app = express();


//Variable de contenu de la base de donnée
var currentIdEleve;
var currentIdParent;
var currentIdGarderie;

router.get('/init', function (req, res, next){
    res.locals.connection.query('SELECT MAX(idParent) AS P, MAX(idEleve) AS E FROM parents, eleves',function(error, results, fields){
        res.send({"status":200, "error":null, "response":results});
        currentIdParent = results[0]['P'];
        currentIdEleve = results[0]['E'];
    });

});



//
router.get('/login', function(req,res,next){
    var username = req.query.username;
    var password = req.query.password;
    if (username && password) {
        res.locals.connection.query('SELECT * FROM utilisateurs WHERE login = ? and motDePasse = ?', [username,password], function(error, results, fields) {
            if (error) throw error;
            res.send({"status": 200, "error": null, "response": results});
        });
    }
});


router.get('/eleves', function(req, res, next) {
    var eleve_id = req.query.id;
    var eleve_name = req.query.name;
    var eleve_surname = req.query.surname;
    //console.log(eleve_name);
    if (typeof eleve_id != "undefined") {
        res.locals.connection.query('SELECT * from eleves NATURAL JOIN classes WHERE idEleve = ?' ,[eleve_id], function (error, results, fields) {
            if (error) throw error;
            //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            res.send({"status": 200, "error": null, "response": results});
        });
    }
    else if (typeof eleve_name != "undefined") {
        if (typeof eleve_surname != "undefined") {
            res.locals.connection.query('select * from eleves NATURAL JOIN classes where nomEleve like ? AND prenomEleve LIKE ?' ,[eleve_name+'%', eleve_surname+'%'], function (error, results, fields) {
                if (error) throw error;
                //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                res.send({"status": 200, "error": null, "response": results});
            });
        }
        else {
            res.locals.connection.query('select * from eleves NATURAL JOIN classes where nomEleve like ?', [eleve_name + '%'], function (error, results, fields) {
                if (error) throw error;
                //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
                res.send({"status": 200, "error": null, "response": results});
            });
        }
    }
    else {
        res.locals.connection.query('SELECT * from eleves NATURAL JOIN classes', function (error, results, fields) {
            if (error) throw error;
            //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
            res.send({"status": 200, "error": null, "response": results});
        })};
});

router.get('/parents', function (req, res, next) {
    var parent_id=req.query.id;
    if(typeof parent_id !="undefined"){
        res.locals.connection.query('SELECT * FROM parents WHERE idParent =?',[parent_id], function (error, results, fields) {
            if (error) throw error;
            //res.send(JSON.stringify(({"status": 200, "error": null, "reponse": results})));
            res.send({"status": 200, "error": null, "response": results});
        });
    }
    else
    {
        res.locals.connection.query('SELECT * FROM parents', function (error, results, fields) {
            if (error) throw error;
            //res.send(JSON.stringify({"status": 200, "error": null, "reponse": results}));
            res.send({"status": 200, "error": null, "response": results});
        });
    }
});


router.post('/eleve', function (req, res, next) {
    if(req.body.formEleveId==0){ //Si c'est un nouvel élève
        res.locals.connection.query('INSERT INTO eleves (idEleve, nomEleve, prenomEleve, naissance, nationalite, idClasse, parent1Id, parent2Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [currentIdEleve+1, req.body.formEleveNom, req.body.formElevePrenom, req.body.formEleveDOB, req.body.formEleveNationalite, req.body.formEleveClasse, req.body.formEleveP1, req.body.formEleveP2], function(error, results, fields){
            if(error) throw error;
            console.log('Eleve ajouté');
            currentIdEleve++;
            res.redirect(req.headers.referer);//pas juste faut changer les id
        });
    }
    else{ //Si l'élève est déjà connu
        res.locals.connection.query('UPDATE eleves SET nomEleve = ?, prenomEleve = ?, naissance = ?, nationalite = ?, idClasse = ?, parent1Id = ?, parent2Id = ? WHERE idEleve = ?', [req.body.formEleveNom, req.body.formElevePrenom, req.body.formEleveDOB, req.body.formEleveNationalite, req.body.formEleveIdClasse, req.body.formEleveP1, req.body.formEleveP2, req.body.formEleveId],function(error, results, fields){
            if(error) throw error;
            console.log('Eleve modifié');
            res.redirect(req.headers.referer);
        });
    }




});

router.post('/parent', function (req, res, next) {
    res.locals.connection.query('UPDATE parents SET nomParent = ?, prenomParent = ?, adresse = ?, telephonne = ?, GSM = ?, email = ? WHERE idParent = ?',[req.body.formParentNom, req.body.formParentPrenom, req.body.formParentAdresse, req.body.formParentTelephone, req.body.formParentGSM, req.body.formParentEmail, req.body.formParentId],function (err, results) {
       if (err) throw err;
       console.log("Parent modifié");
       res.redirect(req.headers.referer);
    });
});


router.get('/garderie', function (req, res, next) {

    res.locals.connection.query('SELECT * FROM garderie NATURAL JOIN eleves NATURAL JOIN classes', function (error, results, fields) {

        if (error) throw error;
        res.send({"status": 200, "error": null, "response": results});
    });
});

router.post('/garderie', function (req,res,next) {
    res.locals.connection.query('INSERT INTO garderie(idGarderie,idEleve,dateoutin,heure,outin) VALUES (?,?,?,?,?)', [req.body.idGarderie, req.body.idEleve, req.body.dateoutin, req.body.heure, req.body.outin], function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.redirect('/garderie');
    });
});



module.exports = router;
