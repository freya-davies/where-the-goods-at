
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
    table.string('season')
    table.integer('quantity')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('items')
};
