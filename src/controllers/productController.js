//******* Require´s ******* 
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const DB = require('../database/models');

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//******* Getting experience JSON file *******
const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath, {encoding: "utf-8"}));


//******* Controller *******
const productController={
//******* Rendering Experience detail *******
    productDescription: (req, res) => {
        const experience_id = req.params.id;
        Experience.findByPk(experience_id, {
            include: [
                {association: 'images'}
            ]
        })
        .then(experience => {
            res.render('productDescription', {experienceDetail: experience });
        })
        .catch(error => console.log(error));
        // let experienceDetail = experiences.find(experience => experience.id == req.params.id);
    },

//******* Rendering provisional editor view *******   
listProductsToEdit: (req, res) => {

        const userExperiences = [];

        for(let i=0; i<9; i++){
            userExperiences.push(experiences[i]);
        }
        const user = req.session.user;
        res.render('listProductsToEdit', {user, experiences: userExperiences});
    }, 

//******* Rendering editor view *******
    editor: (req, res) => {
        let experienceEdit = experiences.find(experience => experience.id == req.params.id);
        res.render('editor', {experienceEdit: experienceEdit });
    },
//******* Update - Method to update *******
	update: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let id = req.params.id;
		    let editedExperiences = experiences.find(experience => experience.id == id);
            if(req.files[0] != undefined){
                image = req.files[0].filename;  
		    }else{
			    image = editedExperiences.image;
		    }
            const newEditedExperiences = {
			    id: editedExperiences.id,
                ...req.body,
                price: parseInt(req.body.price),
                duration: parseInt(req.body.duration),
                peopleQuantity: parseInt(req.body.peopleQuantity), 
                owner: editedExperiences.owner,
                image: image,
                rating: editedExperiences.rating,
                map: editedExperiences.map,
                offer: editedExperiences.offer,
		    }
        
            let newExperience = experiences.map(experience => {
                if (experience.id == newEditedExperiences.id){
                    return experience = {...newEditedExperiences}
			    }
                return experience
		    })
            fs.writeFileSync(experiencesFilePath, JSON.stringify(newExperience));
     
		    res.redirect ('/product/productDescription/' + editedExperiences.id);
        } else {
            let experienceId = req.params.id;
            let experienceUpdating = experiences.find(experience => experience.id == experienceId);
            res.render('editor', { errors: errors.mapped(), experienceEdit: experienceUpdating });
        }
        
	},

//******* Experience Destroy *******
    destroy: (req, res) => {
        let idToDestroy = req.params.id
        const idToHunt = experiences.find(experience => experience.id == idToDestroy)
        const indice = experiences.indexOf(idToHunt)
        experiences.splice(indice, 1)

        fs.writeFileSync(experiencesFilePath, JSON.stringify(experiences));

        res.redirect('/');
    },
//******* Rendering experience creation view *******
    creacion: (req, res) => {

        //******* Getting user Logged *******
        const userLogged = req.session.user;

        res.render('creacion', { user: userLogged });
    },
//******* Experience creation functionallity *******
    store: (req,res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            let image;

            if(req.file != undefined){
                image = req.file.filename;
            }else{
                image = 'default.jpg';
            }

            const newExperience = {
                id: experiences[experiences.length - 1].id + 1,
                ...req.body,
                price: parseInt(req.body.price),
                duration: parseInt(req.body.duration),
                peopleQuantity: parseInt(req.body.peopleQuantity),
                image: image
            }

            experiences.push(newExperience);

            fs.writeFileSync(experiencesFilePath, JSON.stringify(experiences));

            res.redirect('/');
        }else {
            res.render('creacion', { errors: errors.mapped(), old: req.body });
        }
        
    }
}
module.exports = productController