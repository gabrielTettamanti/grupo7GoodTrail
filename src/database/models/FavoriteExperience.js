module.exports = (sequelize, DataTypes) => {

    const alias = 'FavoriteExperience';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        experience_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        timestamps: false,
        underscore: true
    }

    const FavoriteExperience = sequelize.define(alias, cols, config);
   
    FavoriteExperience.associate = function(models){

        FavoriteExperience.belongsTo(models.Experience, {
            as: 'experience',
            foreignKey: 'experience_id'
        })
        FavoriteExperience.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
    }

    return FavoriteExperience;

}
