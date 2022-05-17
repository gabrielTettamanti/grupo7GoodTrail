const experiences = require('../model/products/experiences');

const productController={
    productDescription: (req, res) => {
        let experienceDetail = experiences.find(experience => experience.id == req.params.id);
        res.render('productDescription', {experienceDetail: experienceDetail});
    },
    editor: (req, res) => {
        res.render('editor');
    },
    creacion: (req, res) => {
        res.render('creacion');
    }
}
module.exports = productController