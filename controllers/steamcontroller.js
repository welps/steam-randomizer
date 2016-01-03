var SteamController = SteamController || {};
var UsersController = require('./userscontroller');

var steam = require('steam-web');
var steamService = new steam({apiKey: process.env.API_KEY, format: 'json'});

SteamController.bringInUserData = function(req, res, next){
    if (req.user) {
        req.body = {steamID: req.user.id, displayName: req.user.displayName, avatarURL: req.user.photos[2].value};
        UsersController.addUser(req, res, next);
        SteamController.getUsersGames(req, res, next);
    };
};

SteamController.getUsersGames = function (req, res, next){
    steamService.getOwnedGames({
        steamid: req.user.id,
        include_appinfo: 1,
        include_played_free_games: 1,
        callback: function(err,data) {
            if (err) return next(err);
            req.body.steamID = req.user.id;
            req.body.games = data.response.games;
            UsersController.addGames(req, res, next);
            res.redirect('/');
        }
    });
};

module.exports = SteamController;