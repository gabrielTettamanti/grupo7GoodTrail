const experiences = require('../model/products/experiences');

const mainController ={

    index: (req, res) => {
        res.render('index', {experiences: experiences});
    },
    experienceCatalog:(req, res) => {
        res.render('experienceCatalog', {experiences: experiences});
    },
    search: (req,res) => {
        const searched = req.query.search;
        const searchExperiences = [];

        experiences.forEach(experience => {
            if(experience.nombre.includes(searched) || experience.nombre.toLowerCase().includes(searched)){
                searchExperiences.push(experience);
            }
        })

        res.render('experienceCatalog', {experiences: searchExperiences});
    },
    notFound: (req, res) => {
        res.render('notFound');
    }
}

module.exports = mainController
