//***** Require´s *****/
const { mapsKey } = require('../config');

const googleMapsMiddleware = (req, res, next) => {
    res.locals.mapsKey = mapsKey;

    next();
}

module.exports = googleMapsMiddleware;