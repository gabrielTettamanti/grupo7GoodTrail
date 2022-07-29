//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const bcrypt = require('bcryptjs');

//***** Getting User model from DB *****/
const User = DB.User;

const UserService = {
    createUser: (body, names, image) => {
        const creationPromise = 
        User.create({
            first_name: names[0], 
            last_name: names[names.length - 1],
            email: body.userEmail,
            password: bcrypt.hashSync(body.userPassword, 10),
            image: image
        });
        return creationPromise;
    },

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