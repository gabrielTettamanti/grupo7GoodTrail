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

    updateUser: (body, userNames, userId) => {
        const updateUserPromise =  User.update({
            first_name: userNames[0],
            last_name: userNames[userNames.length - 1],
            email: body.userEmail,
            bio: body.userBio,
            image: body.image
        },{
            where: {
                id: userId
            }
        });
        return updateUserPromise;
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