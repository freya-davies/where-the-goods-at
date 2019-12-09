const express = require('express')
const router = express.Router()

const db = require('../db/items')
const dbUser = require('../db/users')


router.post('/add', (req, res) => {
    dbUser.getUserByUsername(req.body.user)
        .then(userId => {
            req.body.user = userId.id
            db.addItem(req.body)
                .then(response => {
                    res.sendStatus(200)
            })
        }) 
})

// get public items and users items


router.get('/all', (req, res) => {
    
      //check console to see structure of object

      let userId = req.body.id || 1
    db.getAllItems(userId)
    .then(items => {
        res.json(items)
    })
})

//get single item

router.get('/update/:id', (res,req) => {
    console.log(req.params.id)
    let {id} = req.params
    db.getItem(id)
    .then(item => {
        res.json(item)
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

router.get('/user/:name', (req, res) => {
    dbUser.getUserByUsername(req.params.name)
        .then(userId => {
            db.getPrivateItems(userId.id)
            .then(items => {
                res.json(items)
            })
    })
})

router.get('/categories', (req, res) => {
    db.getCategories()
        .then(data => res.json(data))
})

router.get('/seasons', (req, res) => {
    db.getSeasons()
        .then(data => res.json(data))
})


module.exports = router