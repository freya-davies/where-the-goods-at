const router = require('express').Router()

const db = require('../db/users')

router.get('/', (req, res) => {
  db.getUsers().then(data => res.json(data))
})

module.exports = router