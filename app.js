const {injectUserIfExist} = require("./util");

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let multer = require('multer');
require('./routes/index');
require('./routes/xss');
require('./routes/csrf');
require('./routes/sop');
require('./routes/preflight');
require('./routes/clickjacking');
let {router, render} = require('./util');
const app = express();
// view engine setup

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: './uploads/'}).single());
app.use(cookieParser());
app.use((req, res, next) => {
    injectUserIfExist(req, res, next);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.write(err.message || err);
});

module.exports = app;
