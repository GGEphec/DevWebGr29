var express = require('express');


module.exports = function (req, res, next) {
    var token = 'x'
    if(token){
    next()
        }
        else{
        res.redirect('/login')
        }
}
