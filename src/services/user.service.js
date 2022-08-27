//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;
const bcrypt = require('bcryptjs');

//***** Getting User model from DB *****/
const User = DB.User;

const UserService = {
    getUserList: (page, usersPerPage) => {
        const skip = (page) * usersPerPage;
        const usersList = 
        User.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email'],
            offset: skip,
            limit: usersPerPage
        });
        return usersList
    },

    getTotalUsers: () => {
        usersCount = User.count()
        return usersCount
    },

    createUser: (body, names, image) => {
        let first_name = names[0];
        let last_name = names.length > 1 ? names[names.length - 1] : '';
        const creationPromise = 
        User.create({
            first_name: first_name, 
            last_name: last_name,
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

    getUserByPk: userId => {
        const getUserByPkPromise = User.findByPk(userId);
        return getUserByPkPromise;
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