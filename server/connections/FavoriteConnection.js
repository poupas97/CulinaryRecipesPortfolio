const { select, selectSinge, insert, update, remove } = require('../config/connection');
const RecipeConnection = require('./RecipeConnection');

const TABLE = 'favorites';

const listFavorites = async () => {
  let favorites = await select(TABLE);
  favorites = await Promise.all(favorites.map(async favorite => {
    const recipe = await RecipeConnection.singleRecipeById(favorite.id_recipe);
    return { ...favorite, recipe };
  }));

  return favorites;
};

const singleFavoriteById = async id => {
  const [favorite] = await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
  return favorite;
};

const createFavorite = async favorite => await insert(TABLE, favorite);

const updateFavorite = async (favorite, id) => await update(TABLE, favorite, id);

const deleteFavorite = async id => await remove(TABLE, id);

module.exports = ({ listFavorites, singleFavoriteById, createFavorite, updateFavorite, deleteFavorite });
