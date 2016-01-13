var mongoose = require('mongoose');

if (process.env.NODE_ENV == 'test'){
    var mockgoose = require('mockgoose');
    mockgoose(mongoose);

    mongoose.connect(process.env.DB_TEST_HOST);
}
else {
    mongoose.connect(process.env.DB_HOST);
}

var db = mongoose.connection;

db.on('error', function(err){
    console.log('Connection Error: ' + err);
    process.exit(1);
});

db.once('open', function (callback) {
    console.log('DB successfully connected.');
});
