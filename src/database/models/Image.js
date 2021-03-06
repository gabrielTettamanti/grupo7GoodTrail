module.exports = (sequelize, DataTypes) => {
    
    const alias = "Image"

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }

    const config = {
        tableName: 'experience_image',
        timestamps: false,
        underscore: true
    }

    const Image = sequelize.define(alias, cols, config);

    Image.associate = models => {   

        Image.belongsTo(models.Experience, {
        as: 'experience',
        foreignKey: 'experience_id'
        });

    }
    
    return Image;
}
