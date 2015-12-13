var mongoose = require('mongoose');
var ENV = require('./env');

mongoose.connect(ENV.DB_LOCATION);

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Connection Error: ' + err);
    process.exit(1);
});

db.once('open', function (callback) {
    console.log('DB successfully connected.');
});
