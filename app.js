require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const logger = require('morgan');
const passportSetting = require('./src/middleware/passport');
const config = require('./config');

const app = express();
console.log(`app.env=${app.get('env')}`);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'poepoepoepoepoe', resave: true, saveUninitialized: true }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = req.flash();
  next();
});
// passport
const passport = passportSetting(app);

const login = passport.authenticate('local-login', {
  successRedirect: config.LOGIN_REDIRECT_URL,
  failureRedirect: config.LOGIN_URL,
  failureFlash: true,
});

const routers = [
  {
    path: '/',
    handlers: [require('./src/routes/index')],
  },
  {
    path: '/account',
    handlers: [require('./src/routes/account')],
  },
  {
    path: '/account/login',
    handlers: [login],
  },
];

for (const router of routers) {
  app.use(router.path, router.handlers);
}

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
