const {
  select,
  selectSinge,
  insert,
  update,
  remove,
} = require('../config/connection');
const AuthorConnection = require('./AuthorConnection');
const RecipeIngredientConnection = require('./RecipeIngredientConnection');
const RecipeTypeConnection = require('./RecipeTypeConnection');
const UserConnection = require('./UserConnection');
const { Operators } = require('../config/constants');

const TABLE = 'recipes';

const DbKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
  ID_USER: 'id_user',
  ID_RECIPE_TYPE: 'id_recipe_type',
  ID_AUTHOR: 'id_author',
};

const ObjectKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
  ID_USER: 'idUser',
  ID_RECIPE_TYPE: 'idRecipeType',
  ID_AUTHOR: 'idAuthor',
};

const recipeToDb = (author) => {
  const recipeToSend = {
    [DbKeys.ID]: author[ObjectKeys.ID],
    [DbKeys.NAME]: author[ObjectKeys.NAME],
    [DbKeys.DESCRIPTION]: author[ObjectKeys.DESCRIPTION],
    [DbKeys.ACTIVE]: author[ObjectKeys.ACTIVE],
    [DbKeys.ID_USER]: author[ObjectKeys.ID_USER],
    [DbKeys.ID_RECIPE_TYPE]: author[ObjectKeys.ID_RECIPE_TYPE],
    [DbKeys.ID_AUTHOR]: author[ObjectKeys.ID_AUTHOR],
  };
  Object.entries(recipeToSend).forEach(([key, value]) => {
    if (value === undefined) delete recipeToSend[key];
  });
  return recipeToSend;
};

const dbToRecipe = (author = {}) => {
  const recipeToSend = {
    [ObjectKeys.ID]: author[DbKeys.ID],
    [ObjectKeys.NAME]: author[DbKeys.NAME],
    [ObjectKeys.DESCRIPTION]: author[DbKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: author[DbKeys.ACTIVE],
    [ObjectKeys.ID_USER]: author[DbKeys.ID_USER],
    [ObjectKeys.ID_RECIPE_TYPE]: author[DbKeys.ID_RECIPE_TYPE],
    [ObjectKeys.ID_AUTHOR]: author[DbKeys.ID_AUTHOR],
  };
  Object.entries(recipeToSend).forEach(([key, value]) => {
    if (value === undefined) delete recipeToSend[key];
  });
  return recipeToSend;
};

const listRecipes = async () => {
  const recipes = await select(TABLE);
  return recipes.map(dbToRecipe);
};

const singleRecipeById = async (id) => {
  const [recipe] = await selectSinge(TABLE, [
    { prop: DbKeys.ID, operator: Operators.EQUAL, value: id },
  ]);

  const ingredients = await RecipeIngredientConnection.listIngredientsByRecipe(
    id
  );
  const author = await AuthorConnection.singleAuthorById(
    recipe[DbKeys.ID_AUTHOR]
  );
  const recipeType = await RecipeTypeConnection.singleRecipeTypeById(
    recipe[DbKeys.ID_RECIPE_TYPE]
  );
  const user = await UserConnection.singleUserById(recipe[DbKeys.ID_USER]);

  return { ...dbToRecipe(recipe), ingredients, author, recipeType, user };
};

const createRecipe = async (recipe) => await insert(TABLE, recipeToDb(recipe));

const updateRecipe = async (recipe, id) =>
  await update(TABLE, recipeToDb(recipe), id);

const deleteRecipe = async (id) =>
  await remove(TABLE, [
    { prop: DbKeys.ID, operator: Operators.EQUAL, value: id },
  ]);

module.exports = {
  listRecipes,
  singleRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
