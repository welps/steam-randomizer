var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
        returnURL: process.env.BASE_URL + (process.env.CUSTOM_PATH || '') + '/auth/steam/return',
        realm: process.env.BASE_URL + (process.env.CUSTOM_PATH || ''), 
        apiKey: process.env.API_KEY
    },
    function(identifier, profile, done) {
        process.nextTick(function () {
            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            return done(null, profile);
        });
    }
));