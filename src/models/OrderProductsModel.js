const { DataTypes, Model } = require('sequelize')

class OrderProducts extends Model {
    static init(connection) {
        super.init({
            pedido_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'pedidos',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            produto_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'produtos',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            quantidade_produto: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            valor_produto: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
            {
                sequelize: connection,
                modelName: 'pedido_produtos'
            }
        )
    }
}

module.exports = OrderProducts
