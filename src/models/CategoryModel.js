const { DataTypes, Model } = require('sequelize')

class Category extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true
            },
            descricao: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true
            }
        },
            {
                sequelize: connection,
                modelName: 'categorias'
            }
        );
    }
}

module.exports = Category
