//******* Require´s ******* 
const path = require('path');
const fs = require('fs');

const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath));

const productController={
    productDescription: (req, res) => {
        let experienceDetail = experiences.find(experience => experience.id == req.params.id);
        res.render('productDescription', {experienceDetail: experienceDetail});
    },
    editor: (req, res) => {
        let experienceEdit = experiences.find(experience => experience.id == req.params.id);
        res.render('editor', {experienceEdit: experienceEdit});
    },
    creacion: (req, res) => {
        res.render('creacion');
    },
    store: (req,res) => {
        let image;

        if(req.file != undefined){
            image = req.file.filename;
        }else{
            image = 'default.jpg';
        }

        const newExperience = {
            id: experiences[experiences.length - 1].id + 1,
            ...req.body,
            image: image
        }

        experiences.push(newExperience);

        fs.writeFileSync(experiencesFilePath, JSON.stringify(experiences));

        res.redirect('/');
    }
}
module.exports = productController