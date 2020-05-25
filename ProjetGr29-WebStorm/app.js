//Code principal permettant de gérer l'application

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session_check = require("./routes/middleware");
var session_check2 = require("./routes/middleware2");


//Les différentes routes que l'on va utiliser
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var apiRouter = require('./routes/api');
var garderieRouter = require('./routes/garderie');
var secretariatRouter = require('./routes/secretariat');
var eleveRouter = require('./routes/eleve');
var errorRouter = require('./routes/error');


var app = express();

//connection DB
app.use(function (req, res, next) {
    res.locals.connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'ecole' //TODO remettre la base de base
    });
    res.locals.connection.connect();
    next();

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Redirection en fonction de la route
app.use('/login', loginRouter);
app.use('/api/v1/', apiRouter);
app.use('/users', usersRouter);
app.use('/garderie',session_check2, garderieRouter);
app.use('/secretariat',session_check, secretariatRouter);
app.use('/eleve',session_check, eleveRouter);
app.use('/error', errorRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {message:"Page non trouvée"});
});

module.exports = app;
