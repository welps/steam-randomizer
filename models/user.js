var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({ appid: 'number', name: 'string', playtime_2weeks: 'number', img_logo_url: 'string'});
var userSchema = new mongoose.Schema({ _id: 'number', displayName: 'string', avatarURL: 'string', games: [gameSchema] });

userSchema.statics.addUser = function(steamID, userData, cb){
    this.updateUser(steamID, userData, cb);
};

userSchema.statics.getUser = function(steamID, cb){
    this.findOne({ _id: steamID}, function(err, userData){
        if (err) return cb(err);
        return cb(null, JSON.stringify(userData));
    });
};

userSchema.statics.updateUser = function(steamID, userData, cb){
    this.findOneAndUpdate({ _id: steamID}, userData, {new: true, upsert: true}, function(err, userData){
        if (err) return cb(err);
        return cb(null, userData);
    });
};

userSchema.statics.addGames = function(steamID, gamesData, cb){
    this.findOneAndUpdate({ _id: steamID}, { games: gamesData} , {new: true}, function(err, userData){
        if (err) return cb(err);
        return cb(null, userData);
    });
};

userSchema.statics.getRandomGame = function(steamID, numRequested, cb){
    this.findOne({ _id: steamID}, function(err, userData){
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