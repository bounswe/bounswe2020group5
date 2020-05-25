var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twittercommentsRouter = require('./routes/twittercomments');
var ratingsRouter = require('./routes/ratings');
var giveratingRouter = require('./routes/giverating');
var searchTrendProductRouter = require('./routes/searchtrendforproduct');
var filterusertweetsRouter = require('./routes/filter_user_tweets');
var showfollowersRouter = require('./routes/showfollowers');

var app = express();
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static('./public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/twittercomments', twittercommentsRouter);
app.use('/ratings', ratingsRouter);
app.use('/giverating', giveratingRouter);
app.use('/searchtrendforproduct', searchTrendProductRouter);
app.use('/filter_user_tweets', filterusertweetsRouter);
app.use('/showfollowers', showfollowersRouter);

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
