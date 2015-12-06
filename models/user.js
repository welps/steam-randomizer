var mongoose = require('mongoose');

var schema = new mongoose.Schema({ steamID: 'number', avatarURL: 'string' });
var User = mongoose.model('User', schema);

// Test creation
User.create({ steamID: 12345, avatarURL: 'http://www.example.com' }, function (err) {
    if (err) return handleError(err);
    console.log('Test user created');
});

module.exports = User;