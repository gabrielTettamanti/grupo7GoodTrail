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
        category: {
            type: DataTypes.STRING(50),
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
        map: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        timestamps: false,
        underscore: true
    }
    
    const Experience = sequelize.define(alias, cols, config);

    Experience.associate = models => {
        Experience.belongsTo(models.Offer, {
            as: 'offer',
            foreignKey: 'experience'
        });

        Experience.belongsTo(models.User, {
            as: 'owner',
            foreignKey: 'user'
        });

    }

    return Experience;
}