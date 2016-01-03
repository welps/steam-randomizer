var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({ appid: 'number', name: 'string', playtime_2weeks: 'number', img_logo_url: 'string'});
var userSchema = new mongoose.Schema({ _id: 'number', displayName: 'string', avatarURL: 'string', games: [gameSchema] });

userSchema.virtual('steamID').get(function(){
    return this._id;
});

userSchema.statics.addUser = function(steamId, userData, cb){
    this.updateUser(steamId, userData, cb);
};

userSchema.statics.getUser = function(steamId, cb){
    this.findOne({ _id: steamId}, function(err, userData){
        if (err) return cb(err);
        return cb(null, userData);
    });
};

userSchema.statics.updateUser = function(steamId, userData, cb){
    this.findOneAndUpdate({ _id: steamId}, userData, {new: true, upsert: true}, function(err, userData){
        if (err) return cb(err);
        return cb(null, userData);
    });
};

userSchema.statics.addGames = function(steamId, gamesData, cb){
    this.findOneAndUpdate({ _id: steamId}, { games: gamesData} , {new: true}, function(err, userData){
        if (err) return cb(err);
        return cb(null, userData);
    });
};

userSchema.statics.getRandomGame = function(steamId, numRequested, cb){
    this.findOne({ _id: steamId}, function(err, userData){
        if (err) return cb(err);

        if (userData) {
            var numGames = userData.games.length;
            numRequested = numRequested || 1; // return 1 game if no number set

            var randomValues = getUniqueRandomValues(numGames);
            var game;
            var jsonReturn = {games: []};
            for (var i = 0; i < numRequested; i++) {
                game = userData.games[randomValues.pop()] || {}; // return empty object if requests > games
                jsonReturn.games.push(game);
            }

            return cb(null, JSON.stringify(jsonReturn));
        }

        return cb(null, '');
    });
};

// produce randomly ordered unique set of values so no duplicate games are returned
var getUniqueRandomValues = function(num){
    var randomValues = [];
    for (var i = 0; i < num; i++){
        randomValues[i] = i;
    }
    randomValues.sort(function(){
        return Math.random() - 0.5;
    });

    return randomValues;
};

var User = mongoose.model('User', userSchema);

module.exports = User;