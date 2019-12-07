
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('season').del()
    .then(function () {
      // Inserts seed entries
      return knex('season').insert([
        { id: 1, season_name: 'summer' },
        { id: 2, season_name: 'autumn' },
        { id: 3, season_name: 'winter' },
        { id: 4, season_name: 'spring' },
        { id: 5, season_name: 'all' },
        { id: 6, season_name: 'limited' }
      ])
    });
};
