module.exports = (app) => {
  const controller = require('../controllers/FavoriteController')();

  app.route('/api/favorites').get(controller.listFavorites);
  app.route('/api/favorites/:id').get(controller.singleFavoriteById);
  app.route('/api/favorites').post(controller.createFavorite);
  app.route('/api/favorites/:id').put(controller.updateFavorite);
  app.route('/api/favorites/:id').delete(controller.deleteFavorite);
};
