const { select, insert, remove } = require('../config/connection');
const IngredientConnection = require('./IngredientConnection');
const { Operators } = require('../config/constants');

const TABLE = 'recipes_ingredients';

const DbKeys = {
  ID: 'id',
  ID_RECIPE: 'id_recipe',
  ID_INGREDIENT: 'id_ingredient',
};

const listRecipesIngredients = async () => await select(TABLE);

const listIngredientsByRecipe = async (id, onlyRelations = false) => {
  const relations = await select(TABLE,
    [{ prop: DbKeys.ID_RECIPE, operator: Operators.EQUAL, value: id }]);

  if (onlyRelations) return relations;

  return await Promise.all(relations.map(async relation =>
    await IngredientConnection.singleIngredientById(relation.id_ingredient)));
};

const listRecipesByIngredient = async id =>
  await select(TABLE, [{ prop: DbKeys.ID_INGREDIENT, operator: Operators.EQUAL, value: id }]);

const createRecipeIngredient = async relations =>
  await Promise.all(relations.map(async relation =>
    await insert(TABLE, relation)));

const deleteRecipeIngredient = async relationIds =>
  await Promise.all(relationIds.map(async relationId =>
    await remove(TABLE, [{ prop: DbKeys.ID, operator: Operators.EQUAL, value: relationId }])));

module.exports = ({ listRecipesIngredients, listIngredientsByRecipe, listRecipesByIngredient,
  createRecipeIngredient, deleteRecipeIngredient });
