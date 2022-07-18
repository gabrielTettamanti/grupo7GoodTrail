module.exports = (sequelize, DataTypes) => {

    const alias = 'Offer';

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(3,1),
            allowNull: false
        },
        time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        experience_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        timestamps: false
    }

    const Offer = sequelize.define(alias, cols, config);

    Offer.associate = models => {
        Offer.belongsTo(models.Experience, {
            as: 'experience',
            foreignKey: 'experience_id'
        });
    }

    return Offer;
}