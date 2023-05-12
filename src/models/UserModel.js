const { DataTypes, Model } = require('sequelize')

class User extends Model {
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
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
            {
                sequelize: connection,
                modelName: 'usuarios'
            }
        )
    }
}

module.exports = User
