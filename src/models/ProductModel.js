const { DataTypes, Model } = require('sequelize')

class Product extends Model {
    static init(connection) {
        super.init({
            descricao: {
                type: DataTypes.STRING,
                allowNull: false
            },
            quantidade_estoque: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            valor: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            categoria_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'categorias',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        },
            {
                sequelize: connection,
                modelName: 'produtos'
            })
    }

    static associate(models) {
        this.belongsTo(models.categorias, { foreignKey: 'categoria_id', as: 'categoria' })
        this.belongsToMany(models.pedidos, { foreignKey: 'pedido_id', through: 'pedido_produtos', as: 'pedidos' })
    }
}

module.exports = Product
