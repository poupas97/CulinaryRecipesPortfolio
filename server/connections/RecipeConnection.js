const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'recipes';

const listRecipes = async () => await select(TABLE);

const singleRecipeById = async id => {
  const [recipe] = await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
  return recipe;
};

const createRecipe = async recipe => await insert(TABLE, recipe);

const updateRecipe = async (recipe, id) => await update(TABLE, recipe, id);

const deleteRecipe = async id => await remove(TABLE, id);

module.exports = ({ listRecipes, singleRecipeById, createRecipe, updateRecipe, deleteRecipe });
