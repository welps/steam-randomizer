var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({ appid: 'number', name: 'string', playtime_2weeks: 'number', img_logo_url: 'string'});
var userSchema = new mongoose.Schema({ _id: 'number', displayName: 'string', avatarURL: 'string', games: [gameSchema] });

userSchema.virtual('steamID').get(function(){
    return this._id;
});

userSchema.statics.addUser = function(steamId, userData, cb){
    this.updateUser(steamId, userData, cb);
}

userSchema.statics.getUser = function(steamId, cb){
    this.findOne({ _id: steamId}, function(err, userData){
        if (err) return cb(err);
        return cb(null, userData);
    });
}

userSchema.statics.updateUser = function(steamId, userData, cb){
    this.findOneAndUpdate({ _id: steamId}, userData, {upsert: true}, function(err){
        if (err) return cb(err);
    });
}

userSchema.statics.addGames = function(steamId, gamesData, cb){
    this.findOneAndUpdate({ _id: steamId}, { games: gamesData} , function(err){
        if (err) return cb(err);
    });
}

userSchema.statics.getRandomGame = function(steamId, cb){
    this.findOne({ _id: steamId}, function(err, userData){
        if (err) return cb(err);

        if (userData) {
                var numGames = userData.games.length;
                var randomNumber = Math.floor(Math.random() * numGames);

                return cb(null, userData.games[randomNumber]);
        }

        return cb(null, '');
    });
}

var User = mongoose.model('User', userSchema);

module.exports = User;