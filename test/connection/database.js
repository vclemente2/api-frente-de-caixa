const { Sequelize } = require('sequelize')
const testDatabaseConfig = require('../config/databaseConfig')

const Category = require('../../src/models/CategoryModel')
const User = require('../../src/models/UserModel')
const Product = require('../../src/models/ProductModel')
const Customer = require('../../src/models/CustomerModel')

const testConnection = new Sequelize(testDatabaseConfig)

Category.init(testConnection)
User.init(testConnection)
Product.init(testConnection)
Customer.init(testConnection)

Category.associate(testConnection.models)
Product.associate(testConnection.models)

module.exports = testConnection
