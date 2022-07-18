const User = require("./User");

module.exports = (sequelize, DataTypes) => {

    const alias = "CartExperience";

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        experience_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Experience',
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
        underscore: true
    }

    const CartExperience = sequelize.define(alias, cols, config); 

    CartExperience.associate = models => {
        
        CartExperience.belongsTo(models.User, 
           {
            foreignKey: "user_id"
           });

        CartExperience.belongsTo(models.Experience, 
           {
            foreignKey: "experience_id"
           });
    
    }

    return CartExperience
}