module.exports = (sequelize, DataTypes) => {
    
    const alias = "Category"

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        category_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        style: {
            type: DataTypes.STRING(100),
        }
    }

    const config = {
        tableName: 'category',
        timestamps: false,
        underscore: true
    }

    const Category = sequelize.define(alias, cols, config);

    Category.associate = models => {   

        Category.hasMany(models.Experience, {
            as: "experiences",
            foreignKey: "category_id", 
        })

    }
    
    return Category;
}
