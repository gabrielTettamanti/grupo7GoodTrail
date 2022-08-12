//******* Require´s ******* 
const { validationResult } = require('express-validator');

//***** Getting Services *****/
const ExperienceService = require('../services/experience.service');
const UserService = require('../services/user.service');
const RatingService = require('../services/rating.service');
const ImageService = require('../services/experienceImage.service');
const CategoryService = require('../services/experienceCategory.service');
const OfferService = require('../services/offer.service');

const experiencesPerPage = 9;

//******* Controller *******
const productController={
//******* Rendering Experience detail *******
    productDescription: (req, res) => {
        const experience_id = req.params.id;

        ExperienceService.getExperienceById(experience_id)
        .then(experience => {
            console.log('Experiencia');
            console.log(experience);
            res.render('productDescription', {experienceDetail: experience }); 
        })
        .catch(error => console.log(error));
    },

    //******* Rendering provisional editor view *******   
    listProductsToEdit: (req, res) => {
        const query = { status: 1};
        const getPromise = ExperienceService.getExperiences(query);

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

            if(req.file != undefined){
                image = req.file.filename;
                ImageService.updateImage(image, experienceId);  
		    }

            ExperienceService.updateExperience(experienceId, req.body)
            .then(experience => {
                if(req.body.offer != '') {
                    OfferService.updateOffer(1, req.body.offer, req.body.limit_date, experienceId)
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
        ExperienceService.destroyExperience(idToDestroy)
        .then(result => {
            res.redirect('/');    
        })
        .catch(error => console.log(error));
    },
    //******* Rendering experience creation view *******
    creation: (req, res) => { 
        CategoryService.getCategories()
        .then(categories => {
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

            UserService.getUserByEmail(userEmail)
            .then(userFinded => {
                ExperienceService.createExperience(req.body, userFinded.id)
                .then(experience => {
                    let imageCreation = ImageService.createImage(image, experience.id);
                    let offerCreation = OfferService.createOffer(0, null, null, experience.id);
                    let createRating = RatingService.createRating(0, experience.id);

                    Promise.all([ imageCreation, offerCreation, createRating ])
                    .then(([imageResult, offerResult, ratingResult]) => {
                        res.redirect('/');
                    })
                })
            });
            
        }else {
            CategoryService.getCategories()
            .then(categories => {
                res.render('creation', { errors: errors.mapped(), old: req.body, categories });
            })
            .catch(error => console.log(error));
        }
    },

    filterExperiences: (req, res) => {
        console.log(req.query.location);
        const page = req.params.page;
        const query = ExperienceService.getfilterQuery(req.query);

        let getExperiences = ExperienceService.getExperiences(query, page);
        let getCategories = CategoryService.getCategories();
        let getTotal = ExperienceService.getTotalExperiences(query);

        Promise.all([getExperiences, getCategories, getTotal])
        .then(([experiences, categories, total]) => {
            let pages = Math.ceil( total / experiencesPerPage );
            res.render('experienceCatalog', { experiences, categories, pages, currentPage: page });
        })
        .catch(error => console.log(error));
    },

    filterExperiencesByPrice: (req, res) => {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const page = req.params.page;
        const query = ExperienceService.getQueryPrice(minPrice, maxPrice);

        let getExperiences = ExperienceService.getExperiences(query, page);
        let getCategories = CategoryService.getCategories();
        let getTotal = ExperienceService.getTotalExperiences(query);

        Promise.all([getExperiences, getCategories, getTotal])
        .then(([experiences, categories, total]) => {
            let pages = Math.ceil( total / experiencesPerPage );
            res.render('experienceCatalog', { experiences, categories, pages, currentPage: page });
        })
        .catch(error => console.log(error));
    }
}
module.exports = productController