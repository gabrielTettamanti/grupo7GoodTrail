//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting Experience model from DB *****/
const Offer = DB.Offer;

const OfferService = {
    createOffer: (status, discount, time, experienceId) => {
        const offerToCreate = {
            status: status,
            discount: discount,
            limit_date: time,
            experience_id: experienceId
        }
        const creationPromise = Offer.create(offerToCreate);
        return creationPromise;
    },

    updateOffer: (status, discount, limitDate, experienceId) => {
        const offerToUpdate = {
            status: status,
            discount: discount,
            limit_date: limitDate
        }
        const updatePromise = 
        Offer.update(offerToUpdate, {
            where: {
                experience_id: experienceId
            }
        });
        return updatePromise;
    }
}

module.exports = OfferService;