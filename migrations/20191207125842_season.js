
exports.up = function(knex) {
  return knex.schema.createTable('season', table => {
    table.increments('id')
    table.string('season_name')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('season')
};
