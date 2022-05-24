//******* Require´s ******* 
const path = require('path');
const fs = require('fs');
const experiences = require('../model/products/experiences');

const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiencesFile = JSON.parse(fs.readFileSync(experiencesFilePath));

const productController={
    productDescription: (req, res) => {
        let experienceDetail = experiences.find(experience => experience.id == req.params.id);
        res.render('productDescription', {experienceDetail: experienceDetail});
    },
    editor: (req, res) => {
        res.render('editor');
    },
    creacion: (req, res) => {
        res.render('creacion');
    },
    store: (req,res) => {
        const newExperience = {
            id: experiencesFile[experiencesFile.length - 1].id + 1,
            ...req.body
        }

        console.log(experiencesFile);

        // experiencesFile.push(newExperience);

        // fs.writeFileSync(JSON.stringify(experiencesFile));

        // res.redirect('/');
    }
}
module.exports = productController