module.exports = app => {
  const controller = require('../controllers/RecipeController')();

  app.route('/api/recipes').get(controller.listRecipes);
  app.route('/api/recipes/:id').get(controller.singleRecipeById);
  app.route('/api/recipes').post(controller.createRecipe);
  app.route('/api/recipes/:id').put(controller.updateRecipe);
  app.route('/api/recipes/:id').delete(controller.deleteRecipe);
};
