var env = env || {};

env = {
    BASE_URL: 'http://localhost:3000/',
    RETURN_URL: 'http://localhost:3000/auth/steam/return',
    API_KEY: '',
    DB_LOCATION: 'mongodb://localhost/steam-randomizer',
    SESSION_NAME: 'Steam Randomizer',
    SESSION_SECRET: 'your session secret'
};

module.exports = env;