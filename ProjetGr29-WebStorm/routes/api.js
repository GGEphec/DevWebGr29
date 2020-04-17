var express = require('express');
var router = express.Router();
var app = express();


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
   res.locals.connection.query('',function(error, results, fields){
       if(error) throw error;

   });
});

router.get('/garderie', function (req, res, next) {
    res.locals.connection.query('SELECT idGarderie, nomEleve, prenomEleve, annee, date, heure, outIn FROM garderie NATURAL JOIN eleves NATURAL JOIN classes', function (error, results, fields) {
        if (error) throw error;
        res.send({"status": 200, "error": null, "response": results});
    });
});



module.exports = router;
