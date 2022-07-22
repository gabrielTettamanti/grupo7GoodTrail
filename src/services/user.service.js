//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting User model from DB *****/
const User = DB.User;

const UserService = {
    getUserByEmail: userEmail => {
        const findPromise = User.findOne({
            where: {
                email: userEmail
            }
        });
        return findPromise;
    }
}

module.exports = UserService;