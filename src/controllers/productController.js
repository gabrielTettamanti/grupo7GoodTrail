//******* Require´s ******* 
const { validationResult } = require('express-validator');
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

const ExperienceService = require('../services/experience.service');

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
        const searchPromise = ExperienceService.getExperienceById(experience_id);
        
        searchPromise
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
    const getPromise = ExperienceService.getExperiences({});

    getPromise
    .then(experiences => {
        res.render('listProductsToEdit', { experiences: experiences});
    })
    .catch(error => console.log(error));
    }, 

//******* Rendering editor view *******
    editor: (req, res) => {
        const experienceToEdit = req.params.id;
        ExperienceService.getExperienceById(experienceToEdit)
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

            ExperienceService.updateExperience(experienceId, req.body)
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
            ExperienceService.getExperienceById(experienceId)
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
                experience_id: idToDestroy
            }
        })
        .then(result => {
            ExperienceService.destroyExperience(idToDestroy)
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
                ExperienceService.createExperience(req.body, userFinded.id, ratingCreated.id)
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
        console.log(req.query.location);
        let query;
        if(req.query.location != undefined) {
            let locationWanted = req.query.location;
            query = {
                location: { [Op.like]: `%${locationWanted}%` }
            }
        }
        else if(req.query.people_quantity == 'gte2'){
            query = { 
                people_quantity: {
                    [Op.gt]: 2
                }
            } 
        } else {
            query = req.query;
        }

        const getExperiences = ExperienceService.getExperiences(query);
        
        let getCategories = Category.findAll();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            res.render('experienceCatalog', { experiences, categories });
        })
        .catch(error => console.log(error));
    },

    filterExperiencesByPrice: (req, res) => {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        const query = {
            [Op.and]: [
                {price: {[Op.gte]: minPrice}},
                {price: {[Op.lte]: maxPrice}}
            ]
        }

        let getExperiences = ExperienceService.getExperiences(query);
        let getCategories = Category.findAll();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            res.render('experienceCatalog', { experiences, categories });
        })
        .catch(error => console.log(error));
    }
}
module.exports = productController