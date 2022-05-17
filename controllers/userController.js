const experiences = require('../model/products/experiences');

const userController = {
    buyCart: (req, res) => {
        res.render('buyCart', {experiences: experiences});
    },
    login: (req, res) => {
        res.render('login');
    },
    registerFormulary: (req, res) => {
        res.render('registerFormulary');
    }
}
module.exports = userController