const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/databaseConfig')

const Category = require('../models/CategoryModel')
const User = require('../models/UserModel')
const Product = require('../models/ProductModel')
const Customer = require('../models/CustomerModel')

const connection = new Sequelize(databaseConfig)

Category.init(connection)
User.init(connection)
Product.init(connection)
Customer.init(connection)

Category.associate(connection.models)
Product.associate(connection.models)

module.exports = connection
