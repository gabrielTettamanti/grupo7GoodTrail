module.exports = (sequelize, DataTypes) => {

    const alias = 'Rating';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        rating: {
            type: DataTypes.DECIMAL(2,1),
            allowNull: false
        },
        experience_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        timestamps: false,
        underscore: true
    }

    const Rating = sequelize.define(alias, cols, config);

    Rating.associate = models => {

        Rating.belongsTo(models.Experience, {
            as: 'experience',
            foreignKey: 'experience'
        });

        Rating.belongsToMany(models.User, {
            as: 'users',
            through: 'user_rate',
            foreignKey: 'rating_id',
            otherKey: 'user_id'            
        });
    }

    return Rating;
}