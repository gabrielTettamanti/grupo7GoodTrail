const User = require("./User");

module.exports = (sequelize, DataTypes) => {

    const alias = "UserRating";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vote: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        creation_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'rating',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        }
    }

    let config = {
        timestamps: false,
    }

    const UserRating = sequelize.define(alias, cols, config); 

    CartExperience.associate = models => {

        UserRating.belongsTo(models.User, 
        {
            foreignKey: "user_id"
        });
        
        UserRating.belongsTo(models.rating, 
        {
            foreignKey: "rating_id"
        });

    }
    return UserRating
}