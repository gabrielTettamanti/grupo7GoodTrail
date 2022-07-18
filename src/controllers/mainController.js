//******* Require´s ******* 
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

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
        Experience.findAll({
            include: [
                { association: 'images' }
            ]
        })
        .then(experiences => {
            console.log(experiences);
            res.render('experienceCatalog', {experiences: experiences });
        })
        .catch(errors => {
            console.log(errors);
        })
    },
//******* Search functionallity *******
    search: (req,res) => {
        const searched = req.query.search;
        Experience.findAll({
            where: {
                name: { [Op.like]: `%${searched}%`}
            },
            include: [
                { association: 'images' }
            ]
        })
        .then(experiences => {
            console.log(experiences);
            res.render('experienceCatalog', {experiences: experiences }); 
        })
        .catch(error => console.log(error));
    },
//******* Rendering not found *******
    notFound: (req, res) => {

        res.render('notFound');
    }
}

module.exports = mainController
