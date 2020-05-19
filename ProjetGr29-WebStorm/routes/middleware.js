var users = require('./api');

module.exports = function tokenCreate (req, res, next) {
    var token = 's';
    console.log('s ' + token)
    if(token == 's'){
        next();
    }
    else{
        res.redirect('/login');
    }
}
