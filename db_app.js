var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var EventEmiter = require('events');

var sampleDataRouter = require('./routes/action');

myEmitter = new EventEmiter();

myEmitter.on('error', (err) => {
  console.error('An error iccured: ', err);
});
myEmitter.emit('something-wrong', new Error('Something went wrong'));

var app = express();
app.use(express.static("public"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', sampleDataRouter);


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
app.listen(3000, function () {
  console.log('Node app is being served on port: 3000')
})
