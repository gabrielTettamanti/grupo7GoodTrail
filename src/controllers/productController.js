//******* Require´s ******* 
const { validationResult } = require('express-validator');

//***** Getting Services *****/
const ExperienceService = require('../services/experience.service');
const UserService = require('../services/user.service');
const RatingService = require('../services/rating.service');
const ImageService = require('../services/experienceImage.service');
const CategoryService = require('../services/experienceCategory.service');
const OfferService = require('../services/offer.service');

//******* Controller *******
const productController={
//******* Rendering Experience detail *******
    productDescription: (req, res) => {
        const experience_id = req.params.id;
        const searchPromise = ExperienceService.getExperienceById(experience_id);
        
        searchPromise
        .then(experience => {
            RatingService.getRatingById(experience.rating_id)
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
        ImageService.destroyImage(idToDestroy)
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
        CategoryService.getCategories()
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

            let findUser = UserService.getUserByEmail(userEmail);
            let createRating = RatingService.createRating(0);

            Promise.all([findUser, createRating])
            .then(([userFinded, ratingCreated]) => {
                ExperienceService.createExperience(req.body, userFinded.id, ratingCreated.id)
                .then(experience => {
                    let imageCreation = ImageService.createImage(image, experience.id);
                    let offerCreation = OfferService.createOffer(0, null, null, experience.id);
                
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

        const query = ExperienceService.getfilterQuery(req.query);

        const getExperiences = ExperienceService.getExperiences(query);
        
        let getCategories = CategoryService.getCategories();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            res.render('experienceCatalog', { experiences, categories });
        })
        .catch(error => console.log(error));
    },

    filterExperiencesByPrice: (req, res) => {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;

        const query = ExperienceService.getQueryPrice(minPrice, maxPrice);

        let getExperiences = ExperienceService.getExperiences(query);
        let getCategories = CategoryService.getCategories();

        Promise.all([getExperiences, getCategories])
        .then(([experiences, categories]) => {
            res.render('experienceCatalog', { experiences, categories });
        })
        .catch(error => console.log(error));
    }
}
module.exports = productController