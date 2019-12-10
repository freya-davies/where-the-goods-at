const express = require('express')
const router = express.Router()

const db = require('../db/items')
const dbUser = require('../db/users')


router.post('/add', (req, res) => {
    dbUser.getUserByUsername(req.body.user)
        .then(userId => {
            req.body.user = userId.id
            db.addItem(req.body)
                .then(res.sendStatus(200))
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

// get single item

router.get('/item/:id', (req, res) => {
    let { id } = req.params
    db.getItem(id)
        .then(item => {
            res.json(item)
        })
})

// update single item

router.patch('/update/:id', (req, res) => {
    let item = req.body
    console.log(item)

    db.updateItem(req.params.id, item).then(items => {
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
router.get('/user/:name', (req, res) => {
    dbUser.getUserByUsername(req.params.name)
        .then(userId => {
            db.getPrivateItems(userId.id)
                .then(items => {
                    res.json(items)
                })
        })
})

//get all categoies
router.get('/categories', (req, res) => {
    db.getCategories()
        .then(data => res.json(data))
})

//get all seasons
router.get('/seasons', (req, res) => {
    db.getSeasons()
        .then(data => res.json(data))
})


router.delete('/delete/:id', (req,res) => {
    db.deleteItem(req.params.id)
    .then(res.sendStatus(200))
})


module.exports = router