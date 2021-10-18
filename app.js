const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require("serve-favicon");

const { sequelize } = require("./models");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Simple listener to open page-not-found.pug when a route does not exist
app.use((req, res, next) => {
    console.log("Error has occured, page not found.")
    res.status(404).render('error');
});

//Global error handler for the app.
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  };
  if(err.status === 404){
    console.log("Error has occured, page not found.")
    res.status(404).render('error', { err });
  } else {
    console.log(err.message);
    res.status(err.status || 500).render('page-not-found', { err });
  }
});

// app.listen(3000, process.env.PORT, process.env.IP, ()=> {
//   try{
//     sequelize.authenticate();
//     console.log("Database is now connected")
//   } catch(error){
//     console.error("Error connecting: ", err);
//   }
//   console.log("Connected and online");
// });

app.listen(process.env.PORT, process.env.IP, function() {
    try{
    sequelize.authenticate();
    console.log("Database is now connected")
  } catch(error){
    console.error("Error connecting: ", err);
  }
  console.log("Connected and online");
});

module.exports = app;