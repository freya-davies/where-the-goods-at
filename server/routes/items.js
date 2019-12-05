const router = require('express').Router()

const db = require('../db/items')

// get public items and users items


router.get('/all', (req, res) => {
    
      //check console to see structure of object

      console.log(req.body)
      let userId = req.body.id || 1
    db.getAllItems(userId)
    .then(items => {
        res.json(items)
    })
})



// get public items

router.get('/', (req, res) => {
    db.getPublicItems()
    .then(items => {
        res.json(items)
    })
})

// get users private items

router.get('/user', (req, res) => {

    //check console to see structure of object

    console.log(req.body)
    let userId = req.body.id || 1
    db.getPrivateItems(userId)
    .then(items => {
        res.json(items)
    })
})



module.exports = router