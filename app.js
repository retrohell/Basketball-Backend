const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const config = require('config');
const createError = require('http-errors');
const expressJwt = require('express-jwt');
const jwtKey = config.get("secret.key");
const cookieParser = require('cookie-parser');
const i18n = require('i18n');
const logger = require('morgan');

const usersRouter  = require('./routes/users');
const indexRouter = require('./routes/index');

const uri = config.get("dbChain");
mongoose.connect(uri);
const db = mongoose.connection;

// mongodb
db.on('error', () => {
  console.log("Can't connect to database.");
});

db.on('open', () => {
  console.log("Connection succesful");
});

// i18nb
i18n.configure({
  locales: ['es', 'en'],
  cookie: 'language',
  directory: `${__dirname}/locales`
});

//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // static resources
app.use(i18n.init);


app.use(expressJwt({secret:jwtKey, algorithms:['HS256']}).unless({
  path:[
    "/login",
  ]
}));

app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(port, () => {
//  console.log(`Example app listening on port ${port}`)
//})

module.exports = app;
