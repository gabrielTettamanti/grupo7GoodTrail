//******* Require´s ******* 
const path = require('path');
const fs = require('fs');

const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath, {encoding: "utf-8"}));

const productController={
    productDescription: (req, res) => {
        let experienceDetail = experiences.find(experience => experience.id == req.params.id);
        res.render('productDescription', {experienceDetail: experienceDetail});
    },
    editor: (req, res) => {
        let experienceEdit = experiences.find(experience => experience.id == req.params.id);
        res.render('editor', {experienceEdit: experienceEdit});
    },
    // Update - Method to update
	update: (req, res) => {
        let id = req.params.id
		let editedExperiences = experiences.find(product => product.id == id)
        let image 

		if(req.files[0] != undefined){
			
            image = req.files[0].filename  

		}else{
			image = editedExperiences.image
		}
        
		editedExperiences = {
			id: editedExperiences.id,
			...req.body,
			image: image,
			
		}

		let newExperience = experiences.map(experience => {

            if (experiences.id == editedExperiences.id){

                return experience = {...editedExperiences}
			}
            return experience
		})

		fs.writeFileSync(experiencesFilePath, JSON.stringify(newExperience));
     
		res.redirect ('/products/' + editedExperiences.id)
	},

    //******* Product Destroy *******
    destroy: (req, res) => {
        let idToDestroy = req.params.id
        const idToHunt = experiences.find(experience => experience.id == idToDestroy)
        const indice = experiences.indexOf(idToHunt)
        experiences.splice(indice, 1)

        fs.writeFileSync(experiencesFilePath, JSON.stringify(experiences));

        res.redirect('/');
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