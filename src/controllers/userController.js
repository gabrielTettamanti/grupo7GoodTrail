//******* Require´s ******* 
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator")

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
        let experiencesOfCart = [];
        let total = 0;

        for(let i=0; i<3; i++){
            total = total + experiences[i].price
            experiencesOfCart.push(experiences[i]);
        }
       
        res.render('buyCart', {experiences: experiencesOfCart, total });
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
            const names = req.body.userName.split(' '); 
            const newUser = {
                id: users[users.length - 1].id + 1,
                first_name: names[0], 
                last_name: names[names.length - 1],
                email: req.body.userEmail,
                password: bcrypt.hashSync(req.body.userPassword, 10),
                category: 'user',
                image: image
            }
            users.push(newUser);
    
            fs.writeFileSync(usersFilePath, JSON.stringify(users));
            res.redirect('/user/login');
        
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
            const userSearched = users.find(user => user.email == userLogging.email);
            
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
        }
        else{
            res.render("login", {errors: errors.mapped(), old:req.body})
        }
    },    
    userProfile: (req, res) => {
        const userExperiences = [];
        for(let i=0; i<9; i++){
            userExperiences.push(experiences[i]);
        }
        res.render('userProfile', { experiences: userExperiences});
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie("userEmail");
        return res.redirect("/");
    },

    updateUser: (req, res) => {
        console.log(req.body);
        const userEmail = req.body.userEmail;
        const userToEdit = users.find(user => user.email == userEmail );

        const userNames = req.body.userName.split(' ');

        const userUpdated = {
            ...userToEdit,
            first_name: userNames[0],
            last_name: userNames[userNames.length - 1],
            bio: req.body.userBio
        }

        let usersUpdated = users.map(user => {
            if(user.email == userUpdated.email) {
                return user = {...userUpdated};
            }
            return user;
        })

        fs.writeFileSync(usersFilePath, JSON.stringify(usersUpdated));

        res.redirect('/user/profile');
    },

    passwordConfiguration: (req, res) => {
        res.render('changePassword');
    }
}
module.exports = userController