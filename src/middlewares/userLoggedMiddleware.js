//******* Require´s *******
const path = require('path');
const fs = require('fs');

//******* Getting users JSON file *******
const usersFilePath = path.resolve(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, { encoding: 'utf-8' }));

const userLoggedMiddleware = (req, res, next) => {
    res.locals.userIsLogged = false;
    
    let userInCookie = req.cookies.userEmail;
    let userWanted;
    users.forEach(user => {
        if(user.email == userInCookie){
            userWanted= user;
        }
    });

    if(userWanted) {
        req.session.user = userWanted; 
    }

    if(req.session.user){
        res.locals.userIsLogged = true;
        res.locals.userLogged = req.session.user;
    }

    console.log(userWanted);

    
    next();
}

module.exports = userLoggedMiddleware;