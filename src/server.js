require('dotenv').config()
require('express-async-errors');

const express = require('express')
const cors = require('cors')

const routes = require('../src/routes/routes')
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorMiddleware)

module.exports = app