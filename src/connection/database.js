const { Sequelize } = require('sequelize')
const databaseConfig = require('../config/databaseConfig')

const connection = new Sequelize(databaseConfig);

(async () => {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

module.exports = connection
