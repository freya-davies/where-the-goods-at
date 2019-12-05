
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, user_id: 1, category_id: 1, img_url: 'http://source.unsplash.com/500x500/?funny-horse', public: false, description: 'Some funny animals', long: -41.296889, lat: 174.7719502, rating: 5, comments: 'Some nice stuff going on in here', season: 'all year long', quantity: '1000000'},
        {id: 2, user_id: 1, category_id: 1, img_url: 'http://source.unsplash.com/500x500/?funny-horse', public: true, description: 'Some funny animals', long: -41.296990, lat: 174.7719502, rating: 5, comments: 'Some nice stuff going on in here', season: 'all year long', quantity: '1000000'},
        {id: 3, user_id: 1, category_id: 1, img_url: 'http://source.unsplash.com/500x500/?funny-horse', public: true, description: 'Some funny animals', long: -41.296773, lat: 174.7719502, rating: 5, comments: 'Some nice stuff going on in here', season: 'all year long', quantity: '1000000'},
      ]);
    });
};
