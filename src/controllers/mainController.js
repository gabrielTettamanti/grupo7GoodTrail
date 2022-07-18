//******* Require´s ******* 
const path = require('path');
const fs = require('fs');
const DB = require('../database/models');

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//******* Getting experience JSON file *******
const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath));

//******* Controller *******
const mainController ={
//******* Rendering home  *******
    index: (req, res) => {
        let experienceOfHome = [];

        for(let i=0 ; i<4; i++){
            experienceOfHome.push(experiences[i]);
        }
        
        res.render('index', {experiences: experienceOfHome });
    },
//******* Rendering experience catalog *******
    experienceCatalog:(req, res) => {
        // Experience.findAll()
        // .then(experiences => {
        //     console.log(experiences);
        //     res.render('experienceCatalog', {experiences: experiences });
        // });
        let experiencesOfCatalog = [];

        for(let i=0; i<9; i++){
            experiencesOfCatalog.push(experiences[i]);
        }

        res.render('experienceCatalog', {experiences: experiencesOfCatalog });
    },
//******* Search functionallity *******
    search: (req,res) => {
        const searched = req.query.search;
        const searchExperiences = [];

        experiences.forEach(experience => {
            if(experience.name.includes(searched) || experience.name.toLowerCase().includes(searched)){
                searchExperiences.push(experience);
            }
        })

        res.render('experienceCatalog', {experiences: searchExperiences });
    },
//******* Rendering not found *******
    notFound: (req, res) => {

        res.render('notFound');
    }
}

module.exports = mainController
