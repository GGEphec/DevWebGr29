<<<<<<< HEAD
var express = require('express');
var router = express.Router();
const request = require('request');

// Affichage de la page HTML
router.get('/', function(req, res) {
    res.render('garderie');
});

module.exports = router;
=======

var express = require('express');
var router = express.Router();
var app = express();


router.get('/', function(req, res){
   res.render('garderie');
});













module.exports = router;
>>>>>>> 80e12b9938bce6d6ce3e3e6499825f13914a695a
