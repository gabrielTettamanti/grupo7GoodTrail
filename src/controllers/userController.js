//******* Require´s ******* 
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const PasswordRandomer = require('../services/passwordRandomer.service');
const Mailer = require('../services/mailer.service');
const DB = require('../database/models');
const { response } = require('express');

//***** Getting User model from DB *****/
const User = DB.User;

//***** Getting Experience model from DB *****/
const Experience = DB.Experience;

//***** Getting CartExperience model from DB *****/
const CartExperience = DB.CartExperience;
//***** Getting Services *****/
const ExperienceService = require('../services/experience.service');
const UserService = require('../services/user.service');

//******* Getting experience JSON file *******
const experiencesFilePath = path.resolve(__dirname, '../data/experiences.json');
const experiences = JSON.parse(fs.readFileSync(experiencesFilePath, {encoding: 'utf-8'}));

//******* Getting users JSON file *******
const usersFilePath = path.resolve(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, { encoding: 'utf-8' }));

//******* Controller *******
const userController = {
//******* Rendering Experience Buy Cart view *******
    buyCart: (req, res) => {

        //LO QUE ESTABA ANTERIORMENTE //
                
        let experiencesOfCart = [];
        let total = 0;

        for(let i=0; i<3; i++){
            total = total + experiences[i].price
            experiencesOfCart.push(experiences[i]);
        }
       
        res.render('buyCart', {experiences: experiencesOfCart, total });

        // let user_id = req.session.user.id
        // let total = 0;
        
        // CartExperience.findAll({
        //     where: {
        //         user_id : user_id
        //     },
        //     include: [{association: 'experience'}]
        // })
        // .then(experiences => {
        //     let experiencesCart = []
            
        //INTENTO CON FOR:
        //     console.log(experiences.length)
        //     console.log(experiences[1])
        //     console.log(experiences[1].experience.price)
        //     for(let i=0; i<experiences.length; i++){
        //             console.log(experiences[i].experience.price)
        //             total = total + parseInt(experiences[i].experience.price)
        //             let experience_id = (experiences[i].experience.id);
        //             console.log(experience_id)
        //             Experience.findByPk(experience_id, {
        //                 include: [
        //                     {association: 'images'}
        //                 ]
        //             })
        //             .then(newExperience => {
        //             experiencesCart.push(newExperience);
        //             console.log(experiencesCart[i].status)
        //             })
        //         console.log(total)
                
        //     }
        // })
        // res.render('buyCart', {experiences: experiencesCart, total });

            //INTENTO CON FOREACH:
            // experiences.forEach(experience => { 
                
                //     total = total + parseInt(experience.experience.price)
                //     const experience_id = experience.experience.id;
                //     Experience.findByPk(experience_id, {
                //     include: [
                //         {association: 'images'}
                //     ]
                //     })
                //     .then(newExperience => {
                    //         experiencesCart.push(newExperience)
                    //         console.log(experiencesCart)
                    //     })
                    // })
            //     })
            // res.render('buyCart', {experiences: experiencesCart, total });

    },


//******* Adding Experience to the CartExperienceDB *******
    addBuyCart: (req,res) => {
        
        let experience_id = req.params.id;
        let user_id = req.session.user.id

        CartExperience.findOne({
            where:{
                experience_id : experience_id
            }
        })
        .then(resultado => {
            if(resultado == null){

                CartExperience.create({
                        user_id: user_id,
                        experience_id: experience_id
                     })
            }
            
        })

    },
//******* Rendering Login form view*******
    login: (req, res) => {
        res.render('login');
        
    },
//******* Rendering Register form view*******
    registerFormulary: (req, res) => {
        res.render('registerFormulary');
    },
    saveUser: (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            let image; 

            if(req.file != undefined){
                image = req.file.filename;
            }else{
                image = 'profile-default.jpg';
            }

            // console.log(req.body)
            const names = req.body.userName.split(' '); 

            UserService.getUserByEmail(req.body.userEmail)
            .then(user => {
                if(user == null){
                    UserService.createUser(req.body, names, image)
                    .then(user => {
                        res.redirect('/user/login');
                    }) 
                }else{
                    res.render("registerFormulary")
                }
            })
            }
            else{
                res.render("registerFormulary", {errors: errors.mapped(), old:req.body})
            }
    },

    checkLogin: (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()){
            const userLogging = {
                email: req.body.userEmail,
                password: req.body.userPassword
            }
            const noLoginMsg = 'Las credenciales son incorrectas';
            let userSearched = "";
            let userEmail = req.body.userEmail
            UserService.getUserByEmail(userEmail)
            .then((resultado) => {
                userSearched = resultado
                if(userSearched != undefined){
                    if(req.body.remember){
                        res.cookie('userEmail', req.body.userEmail, { maxAge: (1000 * 60) * 2 });
                    }
                    if(bcrypt.compareSync(userLogging.password, userSearched.password)){
                        req.session.user = userSearched;
                        res.redirect('/');
                    } else {
                        res.render('login', { noLoginMsg: noLoginMsg, old: req.body });
                    }
                } else {
                    res.render('login', { noLoginMsg: noLoginMsg, old: req.body });
                }
            })
        }
        else{
            res.render("login", {errors: errors.mapped(), old:req.body})
        }
    },    

    userProfile: (req, res) => {
        const owner = req.session.user.id

        ExperienceService.getExperiencesByOwnerId(owner)
        .then((experiencesByOwner) => {
            let userExperiences = experiencesByOwner
            res.render('userProfile', { experiences: userExperiences});
        })
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userEmail");
        return res.redirect("/");
    },

    updateUser: (req, res) => {

        const body = req.body
        const userId = req.session.user.id
        const userNames = req.body.userName.split(' ');
        UserService.updateUser(body, userNames, userId)
        .then(() => {
            UserService.getUserByPk(userId)
            .then((userLoged) => {
                    req.session.user = userLoged
                }).then(() =>{
                    res.redirect('/user/profile');
                })
        })
    },

    passwordConfiguration: (req, res) => {
        res.render('changePassword');
    },

    getResetPassword: (req, res) => {
        res.render('resetPassword');
    },

    sendPasswordEmail: (req, res) => {
        const userEmail = req.body.userEmail;
        const randomPassword = PasswordRandomer.generateRandomPassword();
        Mailer.sendEmail(userEmail, randomPassword)
        .then(response => {
            res.redirect('/');
        });
    }
}
module.exports = userController