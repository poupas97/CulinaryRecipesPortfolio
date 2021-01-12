const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'ingredients';

const BdKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
};

const ObjectKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
};

const ingredientToBd = ingredient => {
  const ingredientToSend = {
    [BdKeys.ID]: ingredient[ObjectKeys.ID],
    [BdKeys.NAME]: ingredient[ObjectKeys.NAME],
    [BdKeys.DESCRIPTION]: ingredient[ObjectKeys.DESCRIPTION],
    [BdKeys.ACTIVE]: ingredient[ObjectKeys.ACTIVE]
  };
  Object.entries(ingredientToSend).forEach(([key, value]) => {
    if (value === undefined) delete ingredientToSend[key];
  });
  return ingredientToSend;
};

const bdToIngredient = (ingredient = {}) => {
  const ingredientToSend = {
    [ObjectKeys.ID]: ingredient[BdKeys.ID],
    [ObjectKeys.NAME]: ingredient[BdKeys.NAME],
    [ObjectKeys.DESCRIPTION]: ingredient[BdKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: ingredient[BdKeys.ACTIVE]
  };
  Object.entries(ingredientToSend).forEach(([key, value]) => {
    if (value === undefined) delete ingredientToSend[key];
  });
  return ingredientToSend;
};

const listIngredients = async () => {
  const ingredients = await select(TABLE);
  return ingredients.map(bdToIngredient);
};

const singleIngredientById = async id => {
  const [ingredient] = await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
  return bdToIngredient(ingredient);
};

const createIngredient = async ingredient => await insert(TABLE, ingredientToBd(ingredient));

const updateIngredient = async (ingredient, id) => await update(TABLE, ingredientToBd(ingredient), id);

const deleteIngredient = async id => await remove(TABLE, id);

module.exports = ({ listIngredients, singleIngredientById, createIngredient, updateIngredient, deleteIngredient });
