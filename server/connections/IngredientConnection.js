const {
  select,
  selectSinge,
  insert,
  update,
  remove,
} = require('../config/connection');
const { Operators } = require('../config/constants');

const TABLE = 'ingredients';

const DbKeys = {
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

const ingredientToDb = (ingredient) => {
  const ingredientToSend = {
    [DbKeys.ID]: ingredient[ObjectKeys.ID],
    [DbKeys.NAME]: ingredient[ObjectKeys.NAME],
    [DbKeys.DESCRIPTION]: ingredient[ObjectKeys.DESCRIPTION],
    [DbKeys.ACTIVE]: ingredient[ObjectKeys.ACTIVE],
  };
  Object.entries(ingredientToSend).forEach(([key, value]) => {
    if (value === undefined) delete ingredientToSend[key];
  });
  return ingredientToSend;
};

const dbToIngredient = (ingredient = {}) => {
  const ingredientToSend = {
    [ObjectKeys.ID]: ingredient[DbKeys.ID],
    [ObjectKeys.NAME]: ingredient[DbKeys.NAME],
    [ObjectKeys.DESCRIPTION]: ingredient[DbKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: ingredient[DbKeys.ACTIVE],
  };
  Object.entries(ingredientToSend).forEach(([key, value]) => {
    if (value === undefined) delete ingredientToSend[key];
  });
  return ingredientToSend;
};

const listIngredients = async () => {
  const ingredients = await select(TABLE);
  return ingredients.map(dbToIngredient);
};

const singleIngredientById = async (id) => {
  const [ingredient] = await selectSinge(TABLE, [
    { prop: DbKeys.ID, operator: Operators.EQUAL, value: id },
  ]);

  return dbToIngredient(ingredient);
};

const createIngredient = async (ingredient) =>
  await insert(TABLE, ingredientToDb(ingredient));

const updateIngredient = async (ingredient, id) =>
  await update(TABLE, ingredientToDb(ingredient), id);

const deleteIngredient = async (id) =>
  await remove(TABLE, [
    { prop: DbKeys.ID, operator: Operators.EQUAL, value: id },
  ]);

module.exports = {
  listIngredients,
  singleIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
