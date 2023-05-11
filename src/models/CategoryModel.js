const { DataTypes, Model } = require('sequelize')

class Category extends Model {
    static init(connection) {
        super.init({
            descricao: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
            {
                sequelize: connection,
                modelName: 'categorias'
            }
        )
    }

    static associate(models) {
        this.hasMany(models.produtos, { foreignKey: 'categoria_id', as: 'produtos' })
    }
}

module.exports = Category
