///// Requires //////
const UserService = require('../../services/user.service');


const UserAPI = {
    usersList: (req,res) => {
        let getUserList = UserService.getUserList()
        let getTotalUsers = UserService.getTotalUsers()

        Promise.all([getUserList, getTotalUsers])
        .then(([userListInDb, totalUserInDb]) => {
            return res.status(200).json({
                meta: {
                    status: 200
                },
                count: totalUserInDb,
                users: userListInDb
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    },
    getUser:(req,res) => {
        const userId = req.params.id;
        UserService.getUserByPk(userId)
        .then(user => {
            const id = user.id
            const first_name = user.first_name
            const last_name = user.last_name
            const email = user.email
            const bio = user.bio
            const image = user.image

            return res.status(200).json({
                meta: {
                    status: 200
                },
                data: {
                    user : {
                        id,
                        first_name,
                        last_name,
                        email,
                        bio,
                        image
                    }
                 }
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }
}

module.exports = UserAPI;