//***** Require´s *****/
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mapsKey: process.env.GOOGLE_MAPS_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN
}