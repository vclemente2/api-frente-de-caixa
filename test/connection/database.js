const { Sequelize } = require('sequelize')
const testDatabaseConfig = require('../config/databaseConfig')

const testConnection = new Sequelize(testDatabaseConfig)

module.exports = testConnection
