const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/databaseConfig')

const Category = require('../models/CategoryModel')
const User = require('../models/UserModel')
const Product = require('../models/ProductModel')
const Customer = require('../models/CustomerModel')
const Order = require('../models/OrderModel')
const OrderProduct = require('../models/OrderProductsModel')

const connection = new Sequelize(databaseConfig)

Category.init(connection)
User.init(connection)
Product.init(connection)
Customer.init(connection)
Order.init(connection)
OrderProduct.init(connection)

Category.associate(connection.models)
Product.associate(connection.models)
Customer.associate(connection.models)
Order.associate(connection.models)

module.exports = connection
