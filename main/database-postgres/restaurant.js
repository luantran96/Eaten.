const db = require('./index');

module.exports.addRestaurant = (restaurant, cb) => {
  let {
    id,
    name,
    image_url,
    url,
    display_phone,
    review_count,
    categories,
    rating,
    location,
    coordinates,
    photos,
    price,
    hours,
    userId } = restaurant;

  location = location.display_address.join(' ');
  hours = hours[0].open || [];

  console.log('location: ', location);

  db.Restaurant
    .findOne({
      where: {
        yelpId: id,
      },
    })
    .then((foundRestaurant) => {
      if (!foundRestaurant) {
        db.Restaurant.create({
          yelpId: id,
          name,
          image_url,
          url,
          display_phone,
          review_count,
          categories,
          rating,
          location,
          coordinates,
          photos,
          price,
          hours,
          userId,
        })
          .then(() => {
            cb(true);
          });
      } else {
        cb(false);
      }
    });

};

module.exports.removeRestaurant = () => {
  //TODO:
};

module.exports.findRestaurant = (yelpId, cb) => {
  db.Restaurant.findAll({
    where: {
      yelpId,
    }
  })
    .then((restaurant) => {
      cb(restaurant);
    });
};

module.exports.findAllRestaurants = (userId, cb) => {
  db.Restaurant.findAll({
    where: {
      userId,
    }
  })
    .then((restaurants) => {
      cb(restaurants);
    });
};