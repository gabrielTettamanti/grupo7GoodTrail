//******* Require´s ******* 
const { validationResult } = require('express-validator');
const DB = require('../database/models');

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//***** Getting User model from DB *****/
const User = DB.User;

//***** Getting Image model from DB *****/
const Image = DB.Image;

//***** Getting Offer model from DB *****/
const Offer = DB.Offer;

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
        res.render('listProductsToEdit', { experiences: experiences});
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
        const experienceId = req.params.id; 
        const errors = validationResult(req);
        if(errors.isEmpty()){
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
            Experience.findByPk(experienceId)
            .then(experience => {
                res.render('editor', { errors: errors.mapped(), experienceEdit: experience });
            })
            .catch(error => console.log(error));
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
        res.render('creacion');
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
                    let imageCreation = Image.create({
                        url: image,
                        experience_id: experience.id
                    });
                    let offerCreation = Offer.create({
                        status: 0,
                        discount: null,
                        time: null,
                        experience_id: experience.id
                    });                    

                    Promise.all([ imageCreation, offerCreation ])
                    .then(([imageResult, offerResult]) => {
                        console.log(imageResult, offerResult);
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