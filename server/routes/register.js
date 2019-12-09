const express = require('express')
const router = express.Router()

const {compareEmails} = require('../db/register')


router.get('/:email', (req, res) => {
  let email = req.params.email
  compareEmails(email)
.then(x => {
  if (x.length > 0) {
    result = true
  } else {
    result = false
  }
  res.json({result})
})
})


module.exports = router