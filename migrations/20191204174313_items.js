
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id')
    table.integer('user_id')
    table.integer('category_id')
    table.string('img_url')
    table.boolean('public')
    table.string('description')
    table.float('long')
    table.float('lat')
    table.integer('rating')
    table.strings('comments')
    table.string('season')
    table.integer('quantity')
  })
};

exports.down = function(knex) {
  
};
