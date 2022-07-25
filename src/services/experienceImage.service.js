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
    },

    updateImage: (image, experienceId) => {
        const imageToUpdate = {
            url: image
        };
        const updatePromise = 
        Image.update(imageToUpdate, {
            where: {
                experience_id: experienceId
            }
        });
        return updatePromise;
    }
}

module.exports = ImageService;