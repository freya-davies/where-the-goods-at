const connection = require('./connection')

function addItem(item, db = connection) {
    return db('items')
    .insert({
        name: item.name, 
        description: item.description, 
        lat: item.lat,
        long: item.long,
        img_url: item.img
    })
}

module.exports = {
    addItem, 
}