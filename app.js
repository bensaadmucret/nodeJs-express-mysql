// Create a web application to manage multiple task lists.
// It should be possible for us to read, create, update and delete (CRUD) lists. We will also need to be able to read, create, update, and delete tasks.
// We want, of course, to be able to update the status of a task in order to know if it has been validated or not, but also to rename it.
// Thus, a list will have a name and one or more associated tasks while a task will have a name and a status.

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const connection = require('./database/db');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listesRouter = require('./routes/listes');
const tasksRouter = require('./routes/tasks');
console.log(listesRouter);
const flash = require('express-flash');
const session = require('express-session');



const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(
  {
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: '@#$%^&*()_+'

  }));
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/liste', listesRouter);
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/liste', (req, res) => {
  res.render('liste');
});





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
  res.render('error');
});

module.exports = app;
