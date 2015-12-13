var SteamController = SteamController || {};
var UsersController = require('./userscontroller');

var ENV = require('../config/env');
var steam = require('steam-web');
var steamService = new steam({apiKey: ENV.API_KEY, format: 'json'});

SteamController.bringInUserData = function(req, res){
    if (req.body) {
        req.body = {steamID: req.user.id, displayName: req.user.displayName, avatarURL: req.user.photos[2].value};
        UsersController.addUser(req, res);
        SteamController.getUsersGames(req, res);
    };
    res.redirect('/');
};

SteamController.getUsersGames = function (req, res){
    steamService.getOwnedGames({
        steamid: req.user.id,
        include_appinfo: 1,
        include_played_free_games: 1,
        callback: function(err,data) {
            req.body.steamID = req.user.id;
            req.body.games = data.response.games;
            UsersController.addGames(req);
        }
    });
}

module.exports = SteamController;