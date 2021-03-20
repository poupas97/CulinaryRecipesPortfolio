module.exports = (app) => {
  const controller = require('../controllers/IngredientController')();

  app.route('/api/ingredients').get(controller.listIngredients);
  app.route('/api/ingredients/:id').get(controller.singleIngredientById);
  app.route('/api/ingredients').post(controller.createIngredient);
  app.route('/api/ingredients/:id').put(controller.updateIngredient);
  app.route('/api/ingredients/:id').delete(controller.deleteIngredient);
};
