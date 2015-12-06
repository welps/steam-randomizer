var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var ENV = require('./env');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new SteamStrategy({
        returnURL: ENV.RETURN_URL,
        realm: ENV.BASE_URL,
        apiKey: ENV.API_KEY
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