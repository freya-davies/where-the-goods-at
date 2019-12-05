const express = require('express')
const router = express.Router()

const db = require('../db/items.js')

router.post('/add', (req, res) => {
    db.addItem(req.body)
    .then(res.sendStatus(200))
})

module.exports = router