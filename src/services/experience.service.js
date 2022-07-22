//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

const ExperienceService = {
    getExperiences: (query) => {
        const promise =
        Experience.findAll({
            where: query,
            include: [
                {association: 'images'}
            ]
        });
        return promise;
    },

    getExperienceById: experienceId => {
        const searchExperience = 
        Experience.findByPk(experienceId, {
            include: [
                {association: 'images'}
            ]
        })
        return searchExperience;
    },

    createExperience: (body, user, rating) => {
        const experienceToCreate = {
            ...body,
            price: parseInt(body.price),
            duration: parseInt(body.duration),
            people_quantity: parseInt(body.people_quantity),
            user_id: user,
            rating_id: rating
        }
        const creationPromise = Experience.create(experienceToCreate);
        
        return creationPromise;
    },

    updateExperience: (experienceId, body) => {
        const experienceToUpdate = {
            name: body.name,
            description: body.description,
            category: body.category,
            location: body.location,
            duration: body.duration,
            duration_type: body.duration_type,
            currency: body.currency,
            price: parseInt(body.price),
            duration: parseInt(body.duration),
            people_quantity: parseInt(body.people_quantity),
            map_direction: body.map_direction
        }
        
        const promiseToUpdate = 
        Experience.update( experienceToUpdate, {
            where: {
                id: experienceId
            }
        });
        
        return promiseToUpdate;
    },

    destroyExperience: experienceId => {
        const promiseToDestroy =
        Experience.destroy({
            where: {
                id: experienceId
            }
        });
        return promiseToDestroy;
    }
}

module.exports = ExperienceService;