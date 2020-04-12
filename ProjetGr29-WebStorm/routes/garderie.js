var express = require('express');
var router = express.Router();
const request = require('request');

// Affichage de la page HTML
router.get('/', function(req, res) {
    res.render('garderie');
});

module.exports = router;