const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'ingredients';

const KEY_BD_ID = 'id';
const KEY_BD_NAME = 'name';
const KEY_BD_DESCRIPTION = 'description';
const KEY_BD_ACTIVE = 'active';

const KEY_ID = 'id';
const KEY_NAME = 'name';
const KEY_DESCRIPTION = 'description';
const KEY_ACTIVE = 'active';

const ingredientToBd = ingredient => {
  const ingredientToSend = {
    [KEY_BD_ID]: ingredient[KEY_ID],
    [KEY_BD_NAME]: ingredient[KEY_NAME],
    [KEY_BD_DESCRIPTION]: ingredient[KEY_DESCRIPTION],
    [KEY_BD_ACTIVE]: ingredient[KEY_ACTIVE]
  };
  Object.entries(ingredientToSend).forEach(([key, value]) => {
    if (value === undefined) delete ingredientToSend[key];
  });
  return ingredientToSend;
};

const bdToIngredient = (ingredient = {}) => {
  const ingredientToSend = {
    [KEY_ID]: ingredient[KEY_BD_ID],
    [KEY_NAME]: ingredient[KEY_BD_NAME],
    [KEY_DESCRIPTION]: ingredient[KEY_BD_DESCRIPTION],
    [KEY_ACTIVE]: ingredient[KEY_BD_ACTIVE]
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
