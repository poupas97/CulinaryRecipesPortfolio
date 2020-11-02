const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'ingredients';

const listIngredients = async () => await select(TABLE);

const singleIngredientById = async id => {
  const [ingredient] = await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
  return ingredient;
};

const createIngredient = async ingredient => await insert(TABLE, ingredient);

const updateIngredient = async (ingredient, id) => await update(TABLE, ingredient, id);

const deleteIngredient = async id => await remove(TABLE, id);

module.exports = ({ listIngredients, singleIngredientById, createIngredient, updateIngredient, deleteIngredient });
