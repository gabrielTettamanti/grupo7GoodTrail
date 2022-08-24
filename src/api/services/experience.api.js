//*** Require´s *****/
const ExperienceService = require('../../services/experience.service');
const CategoryService = require('../../services/experienceCategory.service');
const Helper = require('./helpers.api');

const ExpierenceAPI = {
    getExperiences: (req, res) => {
        const page = req.query.page;
        const experiencePerPage = 10;

        const getExperiences = ExperienceService.getExperiencesAPI(page, experiencePerPage);
        const getTotalExperiences = ExperienceService.getTotalExperiences('');
        const getCategories = CategoryService.getCategoriesWithExperiences();

        Promise.all([getExperiences, getTotalExperiences, getCategories])
        .then(([experiencesInDB, total, categoriesInDB]) => {
            const experiences = Helper.formatExperiences(experiencesInDB);
            const categories = Helper.getTotalByCategories(categoriesInDB);
            const totalPages = Math.ceil(total / experiencePerPage);

            return res.status(200).json({
                meta: {
                    status: 200
                },
                count: total,
                pages: totalPages,
                experiences: experiences,
                categories
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    },

    getExperience: (req,res) => {
        const experienceId = req.params.id;
        ExperienceService.getExperienceById(experienceId)
        .then(experience => {
            return res.status(200).json({
                meta: {
                    status: 200
                },
                data: {
                    experience,
                    url: experience.images[0].url
                }
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }
}

module.exports = ExpierenceAPI;