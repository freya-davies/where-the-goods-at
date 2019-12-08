
exports.up = function(knex) {
  return knex.schema.createTable('items', table => {
    table.increments('id')
    table.string('item_name')
    table.integer('user_id')
    table.integer('category_id')
    table.string('img_url')
    table.boolean('public')
    table.string('description')
    table.float('long')
    table.float('lat')
    table.integer('rating')
    table.string('comments')
    table.integer('season_id')
    table.integer('quantity')
    table.bigint('created_at')
    table.binary('image')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('items')
};
