const Helper = {
    formatExperiences: experiencesInDB => {
        const experiences = experiencesInDB.map(experience => {
            experience.dataValues.detail = `api/products/${experience.id}`;
            return experience;
        });
        return experiences;
    },

    getTotalByCategories: categoriesInDB => {
        const categories = categoriesInDB.map(category => {
            return {
                category: category.dataValues.category_name,
                totalExperiences: category.dataValues.experiences.length 
            }  
        });
        return categories;
    }
}

module.exports = Helper;