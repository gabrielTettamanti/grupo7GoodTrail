//***** Require´s *****/
const DB = require('../database/models');
const Op = DB.Sequelize.Op;

//***** Getting Experience model from DB *****/
const Category = DB.Category;

const CategoryService = {
    getCategories: () => {
        const promiseToGet = Category.findAll();
        return promiseToGet;
    }
}

module.exports = CategoryService;