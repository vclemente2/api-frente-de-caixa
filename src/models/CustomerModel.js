const { DataTypes, Model } = require('sequelize')

class Customer extends Model {
    static init(connection) {
        super.init({
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            cpf: {
                type: DataTypes.STRING(11),
                allowNull: false,
                unique: true
            },
            cep: {
                type: DataTypes.STRING,
            },
            rua: {
                type: DataTypes.STRING,
            },
            numero: {
                type: DataTypes.STRING,
            },
            bairro: {
                type: DataTypes.STRING,
            },
            cidade: {
                type: DataTypes.STRING,
            },
            estado: {
                type: DataTypes.STRING,
            }
        },
            {
                sequelize: connection,
                modelName: 'clientes'
            })
    }

    static associate(models) {
        this.hasMany(models.pedidos, { foreignKey: 'cliente_id', as: 'cliente' })
    }
}

module.exports = Customer
