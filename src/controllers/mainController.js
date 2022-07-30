//******* Require´s ******* 
const DB = require('../database/models');

//***** Getting Services *****/
const ExperienceService = require('../services/experience.service');
const CategoryService = require('../services/experienceCategory.service');

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//***** Quantity of experiences per page *****/
const experiencesPerPage = 9;

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
        const page = req.params.page; 

        let getExperiences = ExperienceService.getExperiences(query, page);
        let getCategories = CategoryService.getCategories();
        let getTotal = ExperienceService.getTotalExperiences(query);

        Promise.all([getExperiences, getCategories, getTotal])
        .then(([experiences, categories, total]) => {
            let pages = Math.ceil(total / experiencesPerPage);
            res.render('experienceCatalog', {experiences, categories, pages, currentPage: page });
        })
        .catch(errors => {
            console.log(errors);
        })
    },
    //******* Search functionallity *******
    search: (req,res) => {
        const searched = req.query.search;
        const page = req.params.page;
        const query = ExperienceService.getSearchQuery(searched);

        let getExperiences = ExperienceService.getExperiences(query, page);
        let getCategories = CategoryService.getCategories();
        let getTotal = ExperienceService.getTotalExperiences(query); 

        Promise.all([getExperiences, getCategories, getTotal])
        .then(([experiences, categories, total]) => {
            let pages = Math.ceil( total / experiencesPerPage);
            res.render('experienceCatalog', { experiences, categories, pages, currentPage: page }); 
        })
        .catch(error => console.log(error));
    },
    //******* Rendering not found *******
    notFound: (req, res) => {
        res.render('notFound');
    }
}

module.exports = mainController
