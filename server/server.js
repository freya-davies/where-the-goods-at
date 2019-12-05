const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/items')

const server = express()

server.use(cors('*'))

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))

server.use('/api/auth', authRoutes)
server.use('/api/v1/items', itemRoutes)



module.exports = server
