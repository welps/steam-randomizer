if (process.env.NODE_ENV !== 'test') {
    console.log('Please run these tests in a test environment.');
    console.log('Current environment is ' + process.env.NODE_ENV);
    process.exit(1);
}

var mongoose = require('mongoose');
var chai = require('chai');
var async = require('async');
var expect = chai.expect;
var User = require('../../models/user');

/* helper methods */
function addTestUser(steamID, displayName, avatarURL, cb){
    var userData = {
        displayName: displayName,
        avatarURL: avatarURL
    };

    return User.addUser(steamID, userData, cb);
}

function expectDefaultUserToMatch(userToTest){
    expect(userToTest._id).to.be.a('number');
    expect(userToTest._id).to.equal(defaultTestUser.steamID);

    expect(userToTest.steamID).to.be.a('number');
    expect(userToTest.steamID).to.equal(userToTest._id);

    expect(userToTest.displayName).to.be.a('string');
    expect(userToTest.displayName).to.equal(defaultTestUser.displayName);

    expect(userToTest.avatarURL).to.be.a('string');
    expect(userToTest.avatarURL).to.equal(defaultTestUser.avatarURL);
}

/* test data */
var defaultTestUser = {
    steamID: 12345, // _id 
    displayName: 'John',
    avatarURL: 'http://www.example.com'
}

var testGames = [
    { appid: 20, name: 'Dankey Kang', playtime_2weeks: 20, img_logo_url: 'http://www.vgexample.com' },
    { appid: 10, name: 'Sanic the Hadgehug', playtime_2weeks: 100, img_logo_url: 'http://www.vgexample2.com' },
    { appid: 15, name: 'Final Funk', playtime_2weeks: 0, img_logo_url: 'http://www.vgexample3.com' }
];

describe('Users model', function(){
    beforeEach(function(done){
        if (mongoose.connection.readyState === 0) { 
            mongoose.connect(process.env.DB_TEST_HOST, function (err) {
                if (err) throw err;
                for (var i in mongoose.connection.collections){
                    mongoose.connection.collections[i].remove();
                }

                return done();
            });
        }
        else {
            for (var i in mongoose.connection.collections){
                mongoose.connection.collections[i].remove();
            }

            return done();
        }
    });

    afterEach(function(done){
        if (mongoose.connection.readyState != 0) {
            mongoose.disconnect();
            return done();
        }
    });

    describe('addUser/updateUser()', function () {
        it('should create a new User', function (done) {
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function (err, createdUser) {
                if (err) throw err;
                
                expectDefaultUserToMatch(createdUser);

                return done();
            });
        });

        it('should not allow duplicate ids', function (done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});
            addTestUser(defaultTestUser.steamID, 'Steve', defaultTestUser.avatarURL, function(err){if (err) throw err;});
            addTestUser(defaultTestUser.steamID, 'Pete', defaultTestUser.avatarURL, function(err){if (err) throw err;});

            User.count({ _id: defaultTestUser.steamID}, function(err, count){
                if (err) throw err;

                expect(count).to.equal(1);

                return done();
            });

        });

        it('should update user information if user already exists', function (done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});
            User.findOne({ _id: defaultTestUser.steamID}, function(err, createdUser){
                if (err) throw err;

                expectDefaultUserToMatch(createdUser);
            });

            addTestUser(defaultTestUser.steamID, 'Pete', 'http://www.example2.com', function(err){if (err) throw err;});
            User.findOne({ _id: defaultTestUser.steamID}, function(err, updatedUser){
                if (err) throw err;

                expect(updatedUser.displayName).to.equal('Pete');
                expect(updatedUser.avatarURL).to.equal('http://www.example2.com');

                return done();
            });
        });
    });

    describe('getUser()', function(){
        it('should return user information', function(done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});
            User.getUser(defaultTestUser.steamID, function(err, retrievedUser){
                if (err) throw err;

                expectDefaultUserToMatch(retrievedUser);
            
                return done();
            });
        });
    });

    describe('addGames()', function(){
        it('should add games to an existing user', function(done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});

            User.addGames(defaultTestUser.steamID, testGames, function(err, updatedUser){
                if (err) throw err;

                expectDefaultUserToMatch(updatedUser);

                for (var i = 0; i < updatedUser.games.length; i++){
                    expect(updatedUser.games[i].appid).to.be.a('number');
                    expect(updatedUser.games[i].appid).to.equal(testGames[i].appid);
                    expect(updatedUser.games[i].name).to.be.a('string');
                    expect(updatedUser.games[i].name).to.equal(testGames[i].name);
                    expect(updatedUser.games[i].playtime_2weeks).to.be.a('number');
                    expect(updatedUser.games[i].playtime_2weeks).to.equal(testGames[i].playtime_2weeks);
                    expect(updatedUser.games[i].img_logo_url).to.be.a('string');
                    expect(updatedUser.games[i].img_logo_url).to.equal(testGames[i].img_logo_url);
                }

                return done();
            });
        });
    });

    describe('getRandomGame()', function(){
        it('should return a game', function(done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});
            User.addGames(defaultTestUser.steamID, testGames, function(err){if (err) throw err;});

            User.getRandomGame(defaultTestUser.steamID, 1, function(err, returnedGames){
                if (err) throw err;

                returnedGames = JSON.parse(returnedGames);
                expect(returnedGames.games[0]).to.have.property('appid');
                expect(returnedGames.games[0]).to.have.property('name');
                expect(returnedGames.games[0]).to.have.property('playtime_2weeks');
                expect(returnedGames.games[0]).to.have.property('img_logo_url');

                return done();
            });
        });

        it('should return a random game', function(done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});
            User.addGames(defaultTestUser.steamID, testGames, function(err){if (err) throw err;});

            // Run getRandomGame until we get a result that's not the game at index 0
            var gameToTestAgainst = testGames[0];
            var randomGame = {name: testGames[0].name};

            async.whilst(
                function() {return gameToTestAgainst.name == randomGame.name;},
                function(cb) {
                    User.getRandomGame(defaultTestUser.steamID, 1, function(err, returnedGames){
                        if (err) throw err;

                        returnedGames = JSON.parse(returnedGames);
                        randomGame = returnedGames.games[0];

                        cb(null);
                    });
                },
                function(err){
                    if (err) throw err;
                    expect(randomGame.name).to.not.equal(testGames[0].name);

                    done();
                }
            );
        });

        it('should return the requested amount of games', function(done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});
            User.addGames(defaultTestUser.steamID, testGames, function(err){if (err) throw err;});

            User.getRandomGame(defaultTestUser.steamID, 3, function(err, returnedGames){
                if (err) throw err;

                returnedGames = JSON.parse(returnedGames);
                expect(returnedGames.games.length).to.equal(3);

                return done();
            });
        });

        it('should return empty objects if requested amount of games exceeds the number of games the user has', function(done){
            addTestUser(defaultTestUser.steamID, defaultTestUser.displayName, defaultTestUser.avatarURL, function(err){if (err) throw err;});
            User.addGames(defaultTestUser.steamID, testGames, function(err){if (err) throw err;});

            var numberOfGamesToRequest = testGames.length + 3;

            User.getRandomGame(defaultTestUser.steamID, numberOfGamesToRequest, function(err, returnedGames){
                if (err) throw err;

                returnedGames = JSON.parse(returnedGames);
                expect(returnedGames.games.length).to.equal(numberOfGamesToRequest);
                for (var i = 3; i < 6; i++){
                    expect(Object.keys(returnedGames.games[i]).length).to.equal(0);
                }

                return done();
            });
        });
    });
});