/* config for test environment */
var ENV = ENV || {};

ENV = {
    BASE_URL: 'http://localhost:3000/',
    RETURN_URL: 'http://localhost:3000/auth/steam/return',
    API_KEY: '',
    DB_LOCATION: 'mongodb://localhost/steam-randomizer-test',
    SESSION_NAME: 'Steam Random Turqoise',
    SESSION_SECRET: 'blahblahblah'
};

module.exports = ENV;