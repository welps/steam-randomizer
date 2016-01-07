[![Build Status](https://travis-ci.org/welps/steam-randomizer.svg?branch=master)](https://travis-ci.org/welps/steam-randomizer) [![Coverage Status](https://coveralls.io/repos/welps/steam-randomizer/badge.svg?branch=master&service=github)](https://coveralls.io/github/welps/steam-randomizer?branch=master)

# Steam Randomizer
Picks a random game from your Steam games collection. For those paralyzed by choice.

Demo: https://waynecheng.net/steam-randomizer/

## API:
`/user/{steamid}` - returns user data in JSON

`/user/{steamid}/randomgame/{numberofgamestoreturn}` - returns requested number of random games from user's collection in JSON

## Installation

1. Clone or download this repository
2. Copy `config/.env-sample` to `config/.env` and fill in your credentials
  * `BASE_URL` - the base address for your application (this is for the steam passport authentication)
  * `API_KEY` - steam api key
  * `DB_HOST` - mongodb host
  * `SESSION_NAME`, `SESSION_SECRET` - Self explanatory. Sessions are stored in MongoDB.
  * `CUSTOM_PATH` - if you want to deploy the application on a subdirectory such as `http://localhost:3000/foo`
3. Within the root of the repository, type `npm install`
4. Run `npm start` and the application will run off designated location (usually `http://localhost:3000/`)

## Tests

1. Run `npm test`
