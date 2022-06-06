const authenticatorMiddleware = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/user/login');
    }
    next();
}

module.exports = authenticatorMiddleware;