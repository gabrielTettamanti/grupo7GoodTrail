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
        let total = 0;

        for(let i=0; i<9; i++){
            // experiences[i].price = experiences[i].currency + new Intl.NumberFormat('de-DE').format(experiences[i].price)
            total = total + experiences[i].price
            experiencesOfCart.push(experiences[i]);
        }

        //******* Getting user Logged *******
        const userLogged = req.session.user;
        
        res.render('buyCart', {experiences: experiencesOfCart, total, user: userLogged});
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
        if(dejarPasar){
            res.redirect('/');
        }else {
            res.render('login');
        }
    },
    userProfile: (req, res) => {
        const userExperiences = [];
        for(let i=0; i<9; i++){
            userExperiences.push(experiences[i]);
        }
        const user = req.session.user;
        console.log(user);
        res.render('userProfile', {user, experiences: userExperiences});
    }
}
module.exports = userController