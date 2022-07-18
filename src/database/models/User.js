module.exports = (sequelize, dataTypes) => {

    let alias = 'User';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        bio: {
            type: dataTypes.STRING(500),
        },
    };
    let config = {
        timestamps: false,
    }
    
    const User = sequelize.define(alias, cols, config); 

    User.associate = function(models){

        User.hasMany(models.Experience, {
            as: "experiences",
            foreignKey: "user_id", 
        })
        
        User.hasMany(models.FavoriteExperience, {
            as: "favoritesExperiences",
            foreignKey: "user_id",
        })
    }

    return User
};