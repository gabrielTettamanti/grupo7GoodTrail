//******* Require´s ******* 
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const DB = require('../database/models');

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//***** Getting User model from DB *****/
const User = DB.User;

//***** Getting Image model from DB *****/
const Image = DB.Image;

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
    const user = req.session.user;
    Experience.findAll()
    .then(experiences => {
        const user = req.session.user;
        res.render('listProductsToEdit', {user, experiences: experiences});
    })
    .catch(error => console.log(error));

    }, 

//******* Rendering editor view *******
    editor: (req, res) => {
        const experienceToEdit = req.params.id;
        Experience.findByPk(experienceToEdit)
        .then(experience => {
            res.render('editor', {experienceEdit: experience });
        })
    },
//******* Update - Method to update *******
	update: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const experienceId = req.params.id; 

            // if(req.files[0] != undefined){
            //     image = req.files[0].filename;  
		    // }else{
			//     image = editedExperiences.image;
		    // }

            Experience.update({
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                location: req.body.location,
                duration: req.body.duration,
                duration_type: req.body.duration_type,
                currency: req.body.currency,
                price: parseInt(req.body.price),
                duration: parseInt(req.body.duration),
                people_quantity: parseInt(req.body.people_quantity),
                map_direction: req.body.map_direction  
                }, {
                where: {
                    id: experienceId
                }
            })
            .then(experience => {
                res.redirect (`/product/productDescription/${experienceId}`);
            });
    
        } else {
            let experienceId = req.params.id;
            let experienceUpdating = experiences.find(experience => experience.id == experienceId);
            res.render('editor', { errors: errors.mapped(), experienceEdit: experienceUpdating });
        }
        
	},

//******* Experience Destroy *******
    destroy: (req, res) => {
        let idToDestroy = req.params.id;
        Image.destroy({
            where: {
                experience_id: experienceToEdit
            }
        })
        .then(result => {
            Experience.destroy({
                where: {
                    id: idToDestroy
                }
            })
            .then(result => {
                res.redirect('/');    
            })
        })
        .catch(error => console.log(error));
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
            const userEmail = req.session.user.email; 

            if(req.file != undefined){
                image = req.file.filename;
            }else{
                image = 'default.jpg';
            }

            User.findOne({
                where: {
                    email: userEmail
                }
            })
            .then(userFinded => {
                const newExperience = {
                    ...req.body,
                    price: parseInt(req.body.price),
                    duration: parseInt(req.body.duration),
                    people_quantity: parseInt(req.body.people_quantity),
                    user_id: userFinded.id
                }
                Experience.create(newExperience)
                .then(experience => {
                    Image.create({
                        url: image,
                        experience_id: experience.id
                    })
                    .then(image => {
                        console.log(image);
                        res.redirect('/');
                    })
                })
            });
            
        }else {
            res.render('creacion', { errors: errors.mapped(), old: req.body });
        }
        
    }
}
module.exports = productController