var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({ gameName: 'string', recentPlaytime: 'number', imgURL: 'string'});
var userSchema = new mongoose.Schema({ steamID: 'number', avatarURL: 'string', games: [gameSchema] });

var User = mongoose.model('User', userSchema);

// Test creation
User.create({ steamID: 12345, avatarURL: 'http://www.example.com', games: [
    {gameName: 'Farcry 3', recentPlayTime: 50, imgURL: 'http://www.example.com/img.jpg'},
    {gameName: 'Fallout 4', recentPlayTime: 0, imgURL: 'http://www.example.com/img.jpg'}
] }, function (err) {
    if (err) return handleError(err);
    console.log('Test user created');
});

module.exports = User;