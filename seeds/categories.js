
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, category_name: 'Fruit'},
        {id: 2, category_name: 'Vegetables'},
        {id: 3, category_name: 'Herbs'},
        {id: 4, category_name: 'Flowers'},
        {id: 5, category_name: 'Other'},
      ]);
    });
};
