const { DataTypes, Model } = require('sequelize')

class User extends Model {
    static init(connection) {
        super.init({
            nome: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true
            },
            senha: {
                type: DataTypes.TEXT,
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
