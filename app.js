var express = require('express'),
    session = require('express-session'),
    MongoStore = require('connect-mongo/es5')(session),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    config = require('./config'), // executes all configuration files
    customPath = process.env.CUSTOM_PATH || '',
    passport = require('passport'),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    routes = require('./routes'),
    app = express(),
    router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(customPath, express.static(path.join(__dirname, 'public')));

app.use(session({
        secret: process.env.SESSION_SECRET,
        store: new MongoStore({ mongooseConnection: db }),
        name: process.env.SESSION_NAME,
        resave: false,
        saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
        req.db = db;
        next();
});

router.use('/', routes.Home);
router.use('/user', routes.Users);
router.use('/auth', routes.Auth);
app.use(customPath + '/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
