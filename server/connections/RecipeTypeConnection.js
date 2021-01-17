const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'recipe_types';

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

const typeToDb = type => {
  const typeToSend = {
    [DbKeys.ID]: type[ObjectKeys.ID],
    [DbKeys.NAME]: type[ObjectKeys.NAME],
    [DbKeys.DESCRIPTION]: type[ObjectKeys.DESCRIPTION],
    [DbKeys.ACTIVE]: type[ObjectKeys.ACTIVE]
  };
  Object.entries(typeToSend).forEach(([key, value]) => {
    if (value === undefined) delete typeToSend[key];
  });
  return typeToSend;
};

const dbToType = (type = {}) => {
  const typeToSend = {
    [ObjectKeys.ID]: type[DbKeys.ID],
    [ObjectKeys.NAME]: type[DbKeys.NAME],
    [ObjectKeys.DESCRIPTION]: type[DbKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: type[DbKeys.ACTIVE]
  };
  Object.entries(typeToSend).forEach(([key, value]) => {
    if (value === undefined) delete typeToSend[key];
  });
  return typeToSend;
};

const listRecipeTypes = async () => {
  const types = await select(TABLE);
  return types.map(dbToType);
};

const singleRecipeTypeById = async id => {
  const [type] = await selectSinge(TABLE, [{ prop: DbKeys.ID, operator: '=', value: id } ]);
  return dbToType(type);
};

const createRecipeType = async type => await insert(TABLE, typeToDb(type));

const updateRecipeType = async (type, id) => await update(TABLE, typeToDb(type), id);

const deleteRecipeType = async id => await remove(TABLE, id);

module.exports = ({
  listRecipeTypes,
  singleRecipeTypeById,
  createRecipeType,
  updateRecipeType,
  deleteRecipeType,
});
