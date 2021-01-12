const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'recipes';

const DbKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
  ID_USER: 'id_user',
  ID_TYPE: 'id_type',
  ID_AUTHOR: 'id_author',
};

const ObjectKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
  ID_USER: 'idUser',
  ID_TYPE: 'idType',
  ID_AUTHOR: 'idAuthor',
};

const recipeToDb = author => {
  const authorToSend = {
    [DbKeys.ID]: author[ObjectKeys.ID],
    [DbKeys.NAME]: author[ObjectKeys.NAME],
    [DbKeys.DESCRIPTION]: author[ObjectKeys.DESCRIPTION],
    [DbKeys.ACTIVE]: author[ObjectKeys.ACTIVE],
    [DbKeys.ID_USER]: author[ObjectKeys.ID_USER],
    [DbKeys.ID_TYPE]: author[ObjectKeys.ID_TYPE],
    [DbKeys.ID_AUTHOR]: author[ObjectKeys.ID_AUTHOR],
  };
  Object.entries(authorToSend).forEach(([key, value]) => {
    if (value === undefined) delete authorToSend[key];
  });
  return authorToSend;
};

const dbToRecipe = (author = {}) => {
  const authorToSend = {
    [ObjectKeys.ID]: author[DbKeys.ID],
    [ObjectKeys.NAME]: author[DbKeys.NAME],
    [ObjectKeys.DESCRIPTION]: author[DbKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: author[DbKeys.ACTIVE],
    [ObjectKeys.ID_USER]: author[DbKeys.ID_USER],
    [ObjectKeys.ID_TYPE]: author[DbKeys.ID_TYPE],
    [ObjectKeys.ID_AUTHOR]: author[DbKeys.ID_AUTHOR],
  };
  Object.entries(authorToSend).forEach(([key, value]) => {
    if (value === undefined) delete authorToSend[key];
  });
  return authorToSend;
};

const listRecipes = async () => {
  const authors = await select(TABLE);
  return authors.map(dbToRecipe);
};

const singleRecipeById = async id => {
  const [author] = await selectSinge(TABLE, [{ prop: DbKeys.ID, operator: '=', value: id } ]);
  return dbToRecipe(author);
};

const createRecipe = async recipe => await insert(TABLE, recipeToDb(recipe));

const updateRecipe = async (recipe, id) => await update(TABLE, recipeToDb(recipe), id);

const deleteRecipe = async id => await remove(TABLE, id);

module.exports = ({ listRecipes, singleRecipeById, createRecipe, updateRecipe, deleteRecipe });
