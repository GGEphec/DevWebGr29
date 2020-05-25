var express = require('express');
var router = express.Router();



router.get('/', function (req, res){
    var tst="Pas d'erreur";
    res.render('error', {message:tst});

});







module.exports = router;

