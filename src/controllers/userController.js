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

        // let experiencesCart = []
        // let user_id = req.session.user.id
        // let total = 0;

        // CartExperience.findAll({
        //     where: {
        //         user_id : user_id
        //     },
        //     include: [{association: 'experience'}]
        // })
        // .then(experiences => {


        //     experiences.forEach(experience => { 

        //         total = total + parseInt(experience.experience.price)
        //         const experience_id = experience.experience.id;
        //         Experience.findByPk(experience_id, {
        //         include: [
        //             {association: 'images'}
        //         ]
        //         })
        //         .then(newExperience => {
        //             experiencesCart.push(newExperience)
        //             console.log(experiencesCart)
        //         })
        //     })
            
        //     res.render('buyCart', {experiences: experiences, total });
        // })

        //LO QUE ESTABA ANTERIORMENTE //

        // let experiencesOfCart = [];
        // let total = 0;

        // for(let i=0; i<3; i++){
        //     total = total + experiences[i].price
        //     experiencesOfCart.push(experiences[i]);
        // }
       
        // res.render('buyCart', {experiences: experiencesOfCart, total });
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
            if(resultado = null){
            
                CartExperience.create({
                        experience_id: experience_id,
                        user_id: user_id
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

            User.create({
        
                first_name: names[0], 
                last_name: names[names.length - 1],
                email: req.body.userEmail,
                password: bcrypt.hashSync(req.body.userPassword, 10),
                image: image
        
            }).then(()=> {
        
                res.redirect('/user/login');
        
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

            User.findOne({
                where: {
                    email: req.body.userEmail
                }
            }).then((resultado) => {
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

        Experience.findAll({
            where: {
                user_id: owner
            },
            include: [
                    {association: 'images'}
                ]
            
        }).then((experiencesByOwner) => {
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

        const userNames = req.body.userName.split(' ');
        User.update({
                first_name: userNames[0],
                last_name: userNames[userNames.length - 1],
                email: req.body.userEmail,
                bio: req.body.userBio,
                image: req.body.image
        },{
            where: {
                id: userId
            }
        }).then(() => {
            User.findByPk(userId)
                .then((userLoged) => {
                    req.session.user = userLoged
                    console.log(req.session.user)
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