//******* Require´s ******* 
const { validationResult } = require('express-validator');
const DB = require('../database/models');

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//***** Getting User model from DB *****/
const User = DB.User;

//***** Getting Image model from DB *****/
const Image = DB.Image;

//***** Getting Rating model from DB *****/
const Rating = DB.Rating;

//***** Getting Offer model from DB *****/
const Offer = DB.Offer;

//***** Getting Category model from DB *****/
const Category = DB.Category;

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
            Rating.findByPk(experience.rating_id)
            .then(rating => {
                experience.rating = rating.rating;
                res.render('productDescription', {experienceDetail: experience });
            })
        })
        .catch(error => console.log(error));
    },

//******* Rendering provisional editor view *******   
listProductsToEdit: (req, res) => {
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
                if(req.body.offer != '') {
                    Offer.update({
                        status: 1,
                        discount: req.body.offer,
                        limit_date: req.body.limit_date
                    },{
                        where: {
                            experience_id: experienceId
                        }
                    })
                    .then(result => {
                        res.redirect (`/product/productDescription/${experienceId}`);
                    })
                } else {
                    res.redirect (`/product/productDescription/${experienceId}`);
                }
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
    creation: (req, res) => { 
        Category.findAll()
        .then(categories => {
            console.log('Categorias');
            console.log(categories);
            res.render('creation', { categories });
        })
        .catch(error => console.log(error));
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

            let findUser = User.findOne({
                where: {
                    email: userEmail
                }
            });

            let createRating = Rating.create({
                rating: 0
            });

            Promise.all([findUser, createRating])
            .then(([userFinded, ratingCreated]) => {
                const newExperience = {
                    ...req.body,
                    price: parseInt(req.body.price),
                    duration: parseInt(req.body.duration),
                    people_quantity: parseInt(req.body.people_quantity),
                    user_id: userFinded.id,
                    rating_id: ratingCreated.dataValues.id
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
    },

    filterExperiences: (req, res) => {
        const query = req.query;
        console.log('Query');
        console.log(query);

        let getExperiences = Experience.findAll({
            where: query,
            include: [
                {association: 'images'}
            ]
        });

        let getCategories = Category.findAll();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            res.render('experienceCatalog', { experiences, categories });
        })
    }
}
module.exports = productController