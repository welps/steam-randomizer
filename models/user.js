var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({ appid: 'number', name: 'string', playtime_2weeks: 'number', img_logo_url: 'string'});
var userSchema = new mongoose.Schema({ steamID: 'number', displayName: 'string', avatarURL: 'string', games: [gameSchema] });

var User = mongoose.model('User', userSchema);

module.exports = User;