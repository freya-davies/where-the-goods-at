const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'
const connection = knex(config[env])

const db = connection


db('items').select().then(items => console.log(items))

// write the following into terminal to get seed data from site: 
//  node getseeddata.js
