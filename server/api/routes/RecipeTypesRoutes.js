module.exports = (app) => {
  const controller = require('../controllers/RecipeTypeController')();

  app.route('/api/recipeTypes').get(controller.listRecipeTypes);
  app.route('/api/recipeTypes/:id').get(controller.singleRecipeTypeById);
  app.route('/api/recipeTypes').post(controller.createRecipeType);
  app.route('/api/recipeTypes/:id').put(controller.updateRecipeType);
  app.route('/api/recipeTypes/:id').delete(controller.deleteRecipeType);
};
