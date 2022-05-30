//******* Require´s ******* 
const path = require('path');
const fs = require('fs');

const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath, {encoding: "utf-8"}));

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