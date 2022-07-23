module.exports = (sequelize, DataTypes) => {

    const alias = 'Rating';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        value: {
            type: DataTypes.DECIMAL(2,1),
            allowNull: false
        },

        experience_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: 'rating',
        timestamps: false,
        underscore: true
    }

    const Rating = sequelize.define(alias, cols, config);

    Rating.associate = models => {

        Rating.belongsToMany(models.User, {
            as: 'users',
            through: 'user_rate',
            foreignKey: 'rating_id',
            otherKey: 'user_id'            
        });

        Rating.belongsTo(models.Experience, {
            as: 'rating',
            foreignKey: 'experience_id'
        });
    }

    return Rating;
}