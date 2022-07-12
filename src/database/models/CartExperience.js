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
    }

    const CartExperience = sequelize.define(alias, cols, config); 

    CartExperience.belongsTo(User, 
       {
        foreignKey: "user_id"
       });
       
    CartExperience.belongsTo(Experience, 
       {
        foreignKey: "experience_id"
       });

    return CartExperience
}