const { select, insert, remove } = require('../config/connection');

const TABLE = 'recipes_ingredients';

const listRecipesIngredients = async () => await select(TABLE);

const listIngredientsByRecipe = async id =>
  await select(TABLE, [{ prop: 'id_recipe', operator: '=', value: id }]);

const listRecipesByIngredient = async id =>
  await select(TABLE, [{ prop: 'id_ingredient', operator: '=', value: id }]);

const createRecipeIngredient = async relations =>
  await Promise.all(relations.map(async relation =>
    await insert(TABLE, relation)));

const deleteRecipeIngredient = async relationIds =>
  await Promise.all(relationIds.map(async relationId =>
    await remove(TABLE, relationId)));

module.exports = ({ listRecipesIngredients, listIngredientsByRecipe, listRecipesByIngredient,
  createRecipeIngredient, deleteRecipeIngredient });