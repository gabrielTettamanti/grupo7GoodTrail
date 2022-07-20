module.exports = (sequelize, DataTypes) => {

    const alias = 'Experience';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        people_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration_type: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(9,2),
            allowNull: false
        },
        map_direction: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        rating_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: 'experience',
        timestamps: false,
        underscore: true
    }
    
    const Experience = sequelize.define(alias, cols, config);

    Experience.associate = models => {

        // Experience.belongsTo(models.Offer, {
        //     as: 'offer',
        //     foreignKey: 'experience_id'
        // });

        Experience.belongsTo(models.User, {
            as: 'owner',
            foreignKey: 'user_id'
        });

        // Experience.belongsToMany(models.User, {
        //     as: 'userCart',
        //     through: 'cart_experience',
        //     foreignKey: 'experience_id',
        //     otherKey: 'user_id'
        // });

        // Experience.belongsToMany(models.FavoriteExperience, {
        //     as: 'favoriteExperience',
        //     through: 'favorite_experience',
        //     foreignKey: 'experience_id',
        //     otherKey: 'user_id'
        // });

        Experience.hasMany(models.Image, {
            as: 'images',
            foreignKey: 'experience_id'
        });

    }

    return Experience;
}