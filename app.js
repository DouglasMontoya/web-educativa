var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const crypto = require('crypto');
require('dotenv').config()

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var regSuccessRouter = require('./routes/regSuccess');
var homeRouter = require('./routes/home');
var logoutRouter = require('./routes/logout');
var createClassRouter = require('./routes/createClass');
var deleteClassRouter = require('./routes/deleteClass');
var addClassRouter = require('./routes/addClass');
var leaveClassRouter = require('./routes/leaveClass');
var generateListRouter = require('./routes/generateList');
var modulesRouter = require('./routes/modules');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const sessionSecret = crypto.randomBytes(64).toString('hex');
app.use(session({
  key: 'session_cookie_name',
  secret: sessionSecret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// import BulmaCSS
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/regSuccess', regSuccessRouter);
app.use('/home', homeRouter);
app.use('/logout', logoutRouter);
app.use('/createClass', createClassRouter);
app.use('/deleteClass', deleteClassRouter);
app.use('/addClass', addClassRouter);
app.use('/leaveClass', leaveClassRouter);
app.use('/generateList', generateListRouter);
app.use('/modules', modulesRouter);

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

module.exports = app;
