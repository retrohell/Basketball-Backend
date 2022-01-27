const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
const config = require('config');

const usersRouter  = require('./routes/users');

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


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/users', usersRouter);
//app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
