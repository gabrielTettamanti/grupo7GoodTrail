const userLoggedMiddleware = (req, res, next) => {
    res.locals.userIsLogged = false;
    
    if(req.session.user){
        res.locals.userIsLogged = true;
        res.locals.userLogged = req.session.user;
    }
    
    next();
}

module.exports = userLoggedMiddleware;