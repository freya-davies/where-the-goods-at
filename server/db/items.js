const connection = require('./connection')


function addItem(item, db = connection) {
    return db('items')
        .insert({
            item_name: item.item_name,
            description: item.description,
            lat: item.lat,
            long: item.long,
            season_id: item.season,
            quantity: item.quantity,
            rating: item.rating,
            category_id: item.category,
            public: item.public,
            user_id: item.user,
            image: item.image,
            address: item.address
        })
}

function getPublicItems(db = connection) {
    return db('items').select().where('public', true)
        .then(items => {
            return items.map(item => {
                if (item.image) item.image = item.image.toString('utf-8')
                return item
            })
        })
}

function getPrivateItems(userId, db = connection) {
    return db('items').select().where('public', false).where('user_id', userId)
    .then(items => {
        return items.map(item => {
            if (item.image && Buffer.isBuffer(item.image)) {
                item.image = item.image.toString('utf-8')
            }
            return item
        })
    })
}

function getAllItems(userId, db = connection) {
    return db('items').select().where('public', true).orWhere('user_id', userId)
    .then(items => {
        return items.map(item => {
            if (item.image) item.image = item.image.toString('utf-8')
            return item
        })
    })
}

function getCategories(db = connection) {
    return db('categories').select()
}

function getSeasons(db = connection) {
    return db('season').select()
}

function getItem(itemId, db=connection) {
    return db('items').where('id', itemId).first()
}

function updateItem(id, item, db =  connection) {
    return db('items')
    .where('id', id)
    .update({
        item_name: item.item_name,
            description: item.description,
            lat: item.lat,
            long: item.long,
            season_id: item.season,
            quantity: item.quantity,
            rating: item.rating,
            category_id: item.category,
            public: item.public,
            user_id: item.user,
            image: item.image,
    })
}  

function deleteItem(id, db=connection) {
    return db('items')
    .where('id', id)
    .delete()
}

module.exports = {
  addItem,
  getPublicItems,
  getPrivateItems,
  getAllItems,
  getCategories,
  getSeasons,
  getItem,
  updateItem,
  deleteItem
}