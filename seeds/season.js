
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('season').del()
    .then(function () {
      // Inserts seed entries
      return knex('season').insert([
        { id: 1, season_name: 'Summer' },
        { id: 2, season_name: 'Autumn' },
        { id: 3, season_name: 'Winter' },
        { id: 4, season_name: 'Spring' },
        { id: 5, season_name: 'All' },
        { id: 6, season_name: 'Limited' }
      ])
    });
};
