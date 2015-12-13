var express = require('express');
var router = express.Router();
var passport = require('passport');
var SteamController = require('../controllers/steamcontroller');

router.get('/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function(req, res) {
        SteamController.bringInUserData(req, res);
    });

module.exports = router;
