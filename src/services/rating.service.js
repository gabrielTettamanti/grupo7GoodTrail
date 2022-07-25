//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting User model from DB *****/
const Rating = DB.Rating;

const RatingService = {
    getRatingById: ratingId => {
        const findPromise = Rating.findByPk(ratingId);
        return findPromise;
    },

    createRating: (ratingValue, experienceId) => {
        const creationPromise = 
        Rating.create({
            value: ratingValue,
            experience_id: experienceId
        });
        
        return creationPromise;
    }
}

module.exports = RatingService;