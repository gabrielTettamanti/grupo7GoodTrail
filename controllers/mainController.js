//******* Require´s ******* 
const path = require('path');
const fs = require('fs');

const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath));

const mainController ={

    index: (req, res) => {
        let experienceOfHome = [];

        for(let i=0 ; i<3; i++){
            experienceOfHome.push(experiences[i]);
        }

        res.render('index', {experiences: experienceOfHome});
    },
    experienceCatalog:(req, res) => {
        let experiencesOfCatalog = [];

        for(let i=0; i<9; i++){
            experiencesOfCatalog.push(experiences[i]);
        }
        
        res.render('experienceCatalog', {experiences: experiencesOfCatalog});
    },
    search: (req,res) => {
        const searched = req.query.search;
        const searchExperiences = [];

        experiences.forEach(experience => {
            if(experience.name.includes(searched) || experience.name.toLowerCase().includes(searched)){
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
