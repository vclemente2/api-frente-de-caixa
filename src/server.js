require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')

const routes = require('../src/routes/routes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const fs = require('fs/promises')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => res.send(`${await fs.readFile('./src/templates/home.md')}`))
app.use(routes)
app.use(errorMiddleware)

module.exports = app
