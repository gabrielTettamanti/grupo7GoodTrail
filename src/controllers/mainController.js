//******* Require´s ******* 
const DB = require('../database/models');

//***** Getting Services *****/
const ExperienceService = require('../services/experience.service');
const CategoryService = require('../services/experienceCategory.service');

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//******* Controller *******
const mainController ={
    //******* Rendering home  *******
    index: (req, res) => {
        Experience.findAll({
            limit: 4,
            include: [
                { association: 'images' },
                { association: 'rating'}
            ]
        })
        .then(experiences => {
            res.render('index', {experiences: experiences });
        })
        .catch(error => {
            console.log(error);
        })
    },
    //******* Rendering experience catalog *******
    experienceCatalog:(req, res) => {
        const query = { status: 1 };
        let getExperiences = ExperienceService.getExperiences(query);

        let getCategories = CategoryService.getCategories();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            res.render('experienceCatalog', {experiences, categories });
        })
        .catch(errors => {
            console.log(errors);
        })
    },
    //******* Search functionallity *******
    search: (req,res) => {
        const searched = req.query.search;
        const query = ExperienceService.getSearchQuery(searched);

        let getExperiences = ExperienceService.getExperiences(query);
        let getCategories = CategoryService.getCategories();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            res.render('experienceCatalog', { experiences, categories }); 
        })
        .catch(error => console.log(error));
    },
    //******* Rendering not found *******
    notFound: (req, res) => {
        res.render('notFound');
    }
}

module.exports = mainController
