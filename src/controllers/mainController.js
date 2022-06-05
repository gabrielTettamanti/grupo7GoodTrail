//******* Require´s ******* 
const path = require('path');
const fs = require('fs');

//******* Getting experience JSON file *******
const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath));

//******* Controller *******
const mainController ={
//******* Rendering home  *******
    index: (req, res) => {
        let experienceOfHome = [];

        for(let i=0 ; i<4; i++){
            // experiences[i].price = experiences[i].currency + new Intl.NumberFormat('de-DE').format(experiences[i].price)
            experienceOfHome.push(experiences[i]);
        }
        

        //******* Getting user Logged *******
        const userLogged = req.session.user;

        res.render('index', {experiences: experienceOfHome, user: userLogged});
    },
//******* Rendering experience catalog *******
    experienceCatalog:(req, res) => {
        let experiencesOfCatalog = [];

        for(let i=0; i<9; i++){
            // experiences[i].price = experiences[i].currency + new Intl.NumberFormat('de-DE').format(experiences[i].price)
            experiencesOfCatalog.push(experiences[i]);
        }
        
        //******* Getting user Logged *******
        const userLogged = req.session.user;

        res.render('experienceCatalog', {experiences: experiencesOfCatalog, user: userLogged});
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

        //******* Getting user Logged *******
        const userLogged = req.session.user;

        res.render('experienceCatalog', {experiences: searchExperiences, user: userLogged});
    },
//******* Rendering not found *******
    notFound: (req, res) => {

        //******* Getting user Logged *******
        const userLogged = req.session.user;

        res.render('notFound', {user: userLogged});
    }
}

module.exports = mainController
