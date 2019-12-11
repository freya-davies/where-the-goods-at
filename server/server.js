const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')

const itemsRoutes = require('./routes/items')
const checkEmail = require('./routes/register')


const server = express()

server.use(cors('*'))

server.use(express.json({limit: '50mb', extended: true}))
server.use(express.urlencoded({limit: '50mb', extended: true}))
server.use(express.static('public'))

server.use('/api/auth', authRoutes)

server.use('/api/v1/items', itemsRoutes)
server.use('/api/checkEmail', checkEmail)




server.get('/apiKey', (req, res) => {
    res.send(process.env.GOOGLE_MAPS)
})


module.exports = server
