///// Requires //////
const UserService = require('../../../services/user.service');


const UserAPI = {
    usersList: (req,res) => {
        UserService.getUserList()
        .then(users => {
            return res.status(200).json({
                meta: {
                    status: 200
                },
                data: {
                }
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    },
    getUser: (req, res) => {

    }
}

module.exports = UserAPI;