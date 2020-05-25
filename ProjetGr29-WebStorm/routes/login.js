//Code permettat d'afficher la vue login

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('login');
    res.locals.connection.query('DELETE FROM token');
});

module.exports = router;