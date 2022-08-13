//*** Require´s *****/
const ExperienceService = require('../../services/experience.service');

const ExpierenceAPI = {
    getExperience: (req,res) => {
        const experienceId = req.params.id;
        ExperienceService.getAPIExperience(experienceId)
        .then(experience => {
            return res.status(200).json({
                meta: {
                    status: 200
                },
                data: {
                    id: experience.id,
                    name: experience.name,
                    status: experience.status,
                    description: experience.description,
                    location: experience.location,
                    people_quantity: experience.people_quantity,
                    duration: experience.duration,
                    duration_type: experience.duration_type,
                    currency: experience.currency,
                    price: experience.price,
                    map_direction: experience.map_direction,
                    user_id: experience.user_id,
                    category_id: experience.category_id,
                    url: experience.images[0].url
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

module.exports = ExpierenceAPI;