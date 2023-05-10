const { Model, DataTypes } = require('sequelize')

class Order extends Model {
    static init(connection) {
        super.init(
            {
                cliente_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'clientes',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                observacao: {
                    type: DataTypes.STRING
                },
                valor_total: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                sequelize: connection,
                modelName: 'pedidos'
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.clientes, { foreignKey: 'cliente_id', as: 'cliente' })
    }
}

module.exports = Order
