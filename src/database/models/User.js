module.exports = (sequelize, DataTypes) => {

    const alias = 'User';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING(500),
        },
    };
    const config = {
        tableName: 'user',
        timestamps: false
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

        User.hasMany(models.UserRating, {
            as: "userRatings",
            foreignKey: "user_id",
        })

        User.hasMany(models.CartExperience, {
            as: "cartExperiences",
            foreignKey: "user_id",
        })
    }

    return User
};