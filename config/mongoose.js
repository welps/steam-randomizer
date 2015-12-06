var mongoose = require('mongoose');
var ENV = require('./env');

mongoose.connect(ENV.DB_LOCATION);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('DB successfully connected.');
});
