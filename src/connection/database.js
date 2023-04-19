require('dotenv').config()

const connection = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        ssl: { rejectUnauthorized: false }
    }
})

module.exports = connection