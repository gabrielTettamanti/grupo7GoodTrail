//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting Experience model from DB *****/
const Image = DB.Image;

const ImageService = {
    createImage: (image, experienceId) => {
        const creationPromise =
        Image.create({
            url: image,
            experience_id: experienceId
        });
        return creationPromise;
    },

    destroyImage: experienceId => {
        const destroyPromise = 
        Image.destroy({
            where: {
                experience_id: experienceId
            }
        });
        return destroyPromise;
    }
}

module.exports = ImageService;