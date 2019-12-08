const connection = require('./connection')


function addItem(item, db = connection) {
    return db('items')
    .insert({
        item_name: item.item_name, 
        description: item.description, 
        lat: item.lat,
        long: item.long,
        img_url: item.img_url,
        season_id: item.season,
        quantity: item.quantity,
        rating: item.rating,
        category_id: item.category,
        public: item.public,
        user_id: item.user
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

function getCategories(db = connection){
    return db('categories').select()
}

function getSeasons(db = connection){
    return db('season').select()
}

module.exports = {
  addItem,
  getPublicItems,
  getPrivateItems,
  getAllItems,
  getCategories,
  getSeasons,
}