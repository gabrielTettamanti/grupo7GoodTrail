//******* Require´s ******* 
const path = require('path');
const fs = require('fs');

//******* Getting experience JSON file *******
const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath, {encoding: "utf-8"}));

//******* Controller *******
const userController = {
//******* Rendering Experience Buy Cart view *******
    buyCart: (req, res) => {
        let experiencesOfCart = [];

        for(let i=0; i<9; i++){
            experiencesOfCart.push(experiences[i]);
        }
        res.render('buyCart', {experiences: experiencesOfCart});
    },
//******* Rendering Login form view*******
    login: (req, res) => {
        res.render('login');
    },
//******* Rendering Register form view*******
    registerFormulary: (req, res) => {
        res.render('registerFormulary');
    }
}
module.exports = userController