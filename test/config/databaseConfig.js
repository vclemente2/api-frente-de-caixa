require('dotenv').config();

module.exports = {
    dialect: process.env.DB_TEST_CLIENT,
    host: process.env.DB_TEST_HOST,
    username: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASS,
    port: process.env.DB_TEST_PORT,
    database: process.env.DB_TEST_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
    define: {
        timestamps: false,
    }
}