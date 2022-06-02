//******* Require´s ******* 
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

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

        for(let i=0; i<9; i++){
            experiencesOfCart.push(experiences[i]);
        }
        res.render('buyCart', {experiences: experiencesOfCart});
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
        const names = req.body.userName.split(' '); 
        const newUser = {
            id: users[users.length - 1].id + 1,
            first_name: names[0], 
            last_name: names[names.length - 1],
            email: req.body.userEmail,
            password: bcrypt.hashSync(req.body.userPassword, 10),
            category: 'user'
        }
        users.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        res.redirect('/user/login');
    },
    checkLogin: (req, res) => {
        const userLogging = {
            email: req.body.userEmail,
            password: req.body.userPassword
        }

        let dejarPasar = false;
        let userLogged;

        users.forEach(user => {
            if(user.email == userLogging.email && bcrypt.compareSync(userLogging.password, user.password)){
                dejarPasar= true;
                userLogged = user;
            }
        });

        req.session.user = userLogged;

        res.redirect('/');

    },
    userProfile: (req, res) => {
        const user = req.session.user;
        res.render('userProfile', {user});
    }
}
module.exports = userController