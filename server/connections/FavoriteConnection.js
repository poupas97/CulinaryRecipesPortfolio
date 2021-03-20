const {
  select,
  selectSinge,
  insert,
  update,
  remove,
} = require('../config/connection');
const { Operators } = require('../config/constants');
const RecipeConnection = require('./RecipeConnection');

const TABLE = 'favorites';

const DbKeys = {
  ID: 'id',
  ID_USER: 'id_user',
  ID_RECIPE: 'id_recipe',
};

const ObjectKeys = {
  ID: 'id',
  ID_USER: 'idUser',
  ID_RECIPE: 'idRecipe',
};

const favoriteToDb = (favorite) => {
  const favoriteToSend = {
    [DbKeys.ID]: favorite[ObjectKeys.ID],
    [DbKeys.ID_USER]: favorite[ObjectKeys.ID_USER],
    [DbKeys.ID_RECIPE]: favorite[ObjectKeys.ID_RECIPE],
  };
  Object.entries(favoriteToSend).forEach(([key, value]) => {
    if (value === undefined) delete favoriteToSend[key];
  });
  return favoriteToSend;
};

const dbToFavorite = (favorite = {}) => {
  const favoriteToSend = {
    [ObjectKeys.ID]: favorite[DbKeys.ID],
    [ObjectKeys.ID_USER]: favorite[DbKeys.ID_USER],
    [ObjectKeys.ID_RECIPE]: favorite[DbKeys.ID_RECIPE],
  };
  Object.entries(favoriteToSend).forEach(([key, value]) => {
    if (value === undefined) delete favoriteToSend[key];
  });
  return favoriteToSend;
};

const listFavorites = async () => {
  let favorites = await select(TABLE);
  favorites = favorites.map(dbToFavorite);
  favorites = await Promise.all(
    favorites.map(async (favorite) => {
      const recipe = await RecipeConnection.singleRecipeById(favorite.idRecipe);
      return { ...favorite, recipe };
    })
  );

  return favorites;
};

const singleFavoriteById = async (id) => {
  const [favorite] = await selectSinge(TABLE, [
    { prop: DbKeys.ID, operator: Operators.EQUAL, value: id },
  ]);

  return favorite;
};

const createFavorite = async (favorite) =>
  await insert(TABLE, favoriteToDb(favorite));

const updateFavorite = async (favorite, id) =>
  await update(TABLE, favorite, id);

const deleteFavorite = async (id) =>
  await remove(TABLE, [
    { prop: DbKeys.ID, operator: Operators.EQUAL, value: id },
  ]);

const deleteFavoritesByRecipe = async (idRecipe) =>
  await remove(TABLE, [
    { prop: DbKeys.ID_RECIPE, operator: Operators.EQUAL, value: idRecipe },
  ]);

module.exports = {
  listFavorites,
  singleFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite,
  deleteFavoritesByRecipe,
};
