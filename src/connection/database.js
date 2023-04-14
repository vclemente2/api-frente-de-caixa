require('dotenv').config();
const pg = require('pg');

pg.defaults.ssl = true;

const connection = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST
    }
})

module.exports = connection;