var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({ gameName: 'string', recentPlaytime: 'number', imgURL: 'string'});
var userSchema = new mongoose.Schema({ steamID: 'number', displayName: 'string', avatarURL: 'string', games: [gameSchema] });

var User = mongoose.model('User', userSchema);

module.exports = User;