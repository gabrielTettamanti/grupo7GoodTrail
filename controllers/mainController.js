const experiences = require('../model/products/experiences');

const mainController ={

    index: (req, res) => {
        res.render('index', {experiences: experiences});
    },
    experienceCatalog:(req, res) => {
        res.render('experienceCatalog', {experiences: experiences});
    },
    notFound: (req, res) => {
        res.render('notFound');
    }
}

module.exports = mainController
