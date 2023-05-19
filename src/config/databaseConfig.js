require('dotenv').config()

module.exports = {
    dialect: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: true,
    define: {
        timestamps: false,
        underscored: true,
        underscoredAll: true
    }
}