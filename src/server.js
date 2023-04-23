

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')

const routes = require('../src/routes/routes')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send(`<h2 style="color: darkblue">PDV API (Frente de Caixa)</h2><p><b>Bem-vindo à PDV API</b></br></br></br>Desenvolvido pela equipe <b>DEV<span style="color:red">BEVS<span></b>:</br></br><b style="font-size:20px; color:red">B</b>runo Ramos</br><b style="font-size:20px; color:red">E</b>dfram Guerra</br><b style="font-size:20px; color:red">V</b>inicius Bastos</br><b style="font-size:20px; color:red">S</b>hylton Santana</p>`))
app.use(routes)
app.use(errorMiddleware)

module.exports = app
