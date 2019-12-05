
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, item_name: 'Coriander', user_id: 1, category_id: 1, img_url: 'http://source.unsplash.com/500x500/?funny-horse', public: false, description: 'Some funny animals', long: -41.296889, lat: 174.7719502, rating: 5, comments: 'Some nice stuff going on in here', season: 'all year long', quantity: '1000000'},
        {id: 2, item_name: 'Lemons', user_id: 1, category_id: 1, img_url: 'http://source.unsplash.com/500x500/?funny-horse', public: true, description: 'Some funny animals', long: -41.296990, lat: 174.7719502, rating: 5, comments: 'Some nice stuff going on in here', season: 'all year long', quantity: '1000000'},
        {id: 3, item_name: 'Apples', user_id: 1, category_id: 1, img_url: 'http://source.unsplash.com/500x500/?funny-horse', public: true, description: 'Some funny animals', long: -41.296773, lat: 174.7719502, rating: 5, comments: 'Some nice stuff going on in here', season: 'all year long', quantity: '1000000'},
        {id: 4, item_name: 'Elder', user_id: 1, category_id: 1, img_url: 'https://cdn1.bigcommerce.com/n-ww20x/rgdg1pz/products/1708/images/4292/P1016160ELDER__12383.1497781668.1280.1280.jpg?c=2', public: true, description: '', long: -41.322432, lat: 174.786959, rating: 5, comments: 'S', season: 'November/December for flowers, a bit later for berries', quantity: '10'},
        {id: 5, item_name: 'Elder', user_id: 1, category_id: 1, img_url: 'https://i.pinimg.com/originals/10/52/c3/1052c3ef9116a412bfa1c4700df4fa30.jpg', public: true, description: 'On the bank between the road and houses, a big tree', long: -41.323915, lat: 174.789056, rating: 5, comments: 'S', season: 'November/December for flowers, a bit later for berries', quantity: '10'},
        {id: 6, item_name: 'Elder', user_id: 1, category_id: 1, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYSB2RsJ7d20JIyCQ1YlrLzeVprqE1-1aLJP8Qy7xTvhk7PvdU&s', public: true, description: 'Down the hill behind the bus shelter', long: -41.321377, lat: 174.786454, rating: 5, comments: 'S', season: 'November/December for flowers, a bit later for berries', quantity: '10'},
        {id: 7, item_name: 'Elder', user_id: 1, category_id: 1, img_url: 'https://www.google.co.nz/search?q=elder+tree&client=ubuntu&hs=Pm1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiS7_bSt5_mAhXEZSsKHedeAbYQ_AUoAXoECBIQAw&biw=2133&bih=1080#imgrc=OpIqT-4D9gYJ2M:', public: true, description: '', long: -41.318935, lat: 174.781540, rating: 5, comments: 'S', season: 'November/December for flowers, a bit later for berries', quantity: '12'},
        {id: 8, item_name: 'Fig', user_id: 1, category_id: 1, img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQos6c9bksyQvzEOEVdYj2W1NvOwYfPSFbhvOeEcNeX0wHCBd-N&s', public: true, description: 'Lots of trees on the side of the road, yum!', long: -41.331538, lat: 174.772763, rating: 5, comments: 'S', season: 'summer', quantity: '20'},
        {id: 9, item_name: 'Community Garden', user_id: 1, category_id: 1, img_url: 'https://d1k2jfc4wnfimc.cloudfront.net/assets/decor/generalpresentation/id12761pic2.jpg?ts=131417904868855244', public: true, description: 'Down the alley at the end of the street, very cute. A variety of items growing', long: -41.319374, lat: 174.773226, rating: 5, comments: 'S', season: 'Any time!', quantity: '7'},

        {id: 10, item_name: 'Community garden', user_id: 1, category_id: 1, img_url: 'https://www.greenelephant.co.nz/wp-content/uploads/2017/10/Our-organic-vegetable-garden-crops.jpg', public: true, description: 'Small ish guerrilla garden down the end of the street, along a walkway to the park', long: -41.318714, lat: 174.774091, rating: 5, comments: 'S', season: 'Any time', quantity: '10'},
      ]);
    });
};
