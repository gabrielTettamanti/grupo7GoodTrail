//******* Require´s ******* 
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//***** Getting Experience model from DB *****/
const Category = DB.Category;

//******* Controller *******
const mainController ={
//******* Rendering home  *******
    index: (req, res) => {
        Experience.findAll({
            limit: 4,
            include: [
                { association: 'images' }
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
        let getExperiences = Experience.findAll({
            include: [
                { association: 'images' }
            ]
        });

        let getCategories = Category.findAll();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            console.log(experiences);
            res.render('experienceCatalog', {experiences, categories });
        })
        .catch(errors => {
            console.log(errors);
        })
    },
//******* Search functionallity *******
    search: (req,res) => {
        const searched = req.query.search;
        let getExperiences = Experience.findAll({
            where: {
                name: { [Op.like]: `%${searched}%`}
            },
            include: [
                { association: 'images' }
            ]
        });

        let getCategories = Category.findAll();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            console.log(experiences);
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
