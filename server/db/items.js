const connection = require('./connection')


function addItem(item, db = connection) {
    return db('items')
    .insert({
        name: item.name, 
        description: item.description, 
        lat: item.lat,
        long: item.long,
        img_url: item.img,
        season: item.season,
        quantity: item.quantity,
        rating: item.rating,
        category_id: 1,
        public: 1
    })
}


function getPublicItems(db = connection) {
    return db('items').select().where('public', true)
}

function getPrivateItems(userId, db = connection) {
    return db('items').select().where('public', false).where('user_id', userId)
}

function getAllItems(userId, db = connection) {
    return db('items').select().where('public', true).orWhere('user_id', userId)
}

module.exports = {
    addItem, 
    getPublicItems,
    getPrivateItems,
    getAllItems
}