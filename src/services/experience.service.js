//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

const ExperienceService = {
    getExperiences: (query, page) => {
        const experiencePerPage = 9;
        const skip = (page - 1 ) * experiencePerPage;
        const promise =
        Experience.findAll({
            where: query,
            offset: skip,
            limit: experiencePerPage,
            include: [
                {association: 'images'},
                {association: 'rating'}
            ]
        });
        return promise;
    },

    getExperienceById: experienceId => {
        const searchExperience = 
        Experience.findByPk(experienceId, {
            include: [
                {association: 'images'},
                {association: 'rating'}
            ]
        })
        return searchExperience;
    },

    createExperience: (body, user, rating) => {
        const experienceToCreate = {
            ...body,
            status: 1, 
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
        Experience.update({
            status: 0
        },{
            where: {
                id: experienceId
            }
        });
        return promiseToDestroy;
    },

    getQueryPrice: (minPrice, maxPrice) => {
        const query = {
            status: 1,
            [Op.and]: [
                {price: {[Op.gte]: minPrice}},
                {price: {[Op.lte]: maxPrice}}
            ]
        }
        return query;
    },

    getfilterQuery: (queryParams) => {
        let query;
        if(queryParams.location != undefined) {
            let locationWanted = queryParams.location;
            if(locationWanted == 'Buenos Aires'){
                query = {
                    status: 1,
                    location: { [Op.like]: `%${locationWanted}%` }
                }
            } else if(locationWanted == 'Argentina'){
                query = {
                    status: 1,
                    [Op.or]: [
                        { location: { [Op.like]: `%${locationWanted}%` }},
                        { location: { [Op.like]: `%Buenos Aires%` }}
                    ]
                }
            } else {
                query = {
                    status: 1,
                    [Op.and]: [
                        { location: { [Op.notLike]: `%Argentina%` }},
                        { location: { [Op.notLike]: `%Buenos Aires%` }}
                    ]
                }
            }
        }
        else if(queryParams.people_quantity == 'gte2'){
            query = { 
                status: 1,
                people_quantity: {
                    [Op.gt]: 2
                }
            } 
        } else {
            query = queryParams;
            query.status = 1;
        }
        return query;
    },

    getSearchQuery: searched => {
        const query = {
            status: 1,
            name: { [Op.like] : `%${searched}%`}
        }
        return query;
    },

    getTotalExperiences: query => {
        const countPromise = 
        Experience.count({
            where: query
        });

        return countPromise;
    },

    getExperiencesByOwnerId: owner => {
        const experiencesByOwnerPromise =
        Experience.findAll({
            where: {
                user_id: owner
            },
            include: [
                    {association: 'images'}
                ]
        });
        return experiencesByOwnerPromise;
    }

}

module.exports = ExperienceService;