const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'recipe_types';

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

const typeToBd = type => {
  const typeToSend = {
    [BdKeys.ID]: type[ObjectKeys.ID],
    [BdKeys.NAME]: type[ObjectKeys.NAME],
    [BdKeys.DESCRIPTION]: type[ObjectKeys.DESCRIPTION],
    [BdKeys.ACTIVE]: type[ObjectKeys.ACTIVE]
  };
  Object.entries(typeToSend).forEach(([key, value]) => {
    if (value === undefined) delete typeToSend[key];
  });
  return typeToSend;
};

const bdToType = (type = {}) => {
  const typeToSend = {
    [ObjectKeys.ID]: type[BdKeys.ID],
    [ObjectKeys.NAME]: type[BdKeys.NAME],
    [ObjectKeys.DESCRIPTION]: type[BdKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: type[BdKeys.ACTIVE]
  };
  Object.entries(typeToSend).forEach(([key, value]) => {
    if (value === undefined) delete typeToSend[key];
  });
  return typeToSend;
};

const listRecipeTypes = async () => {
  const types = await select(TABLE);
  return types.map(bdToType);
};

const singleRecipeTypeById = async id => {
  const [type] = await selectSinge(TABLE, [{ prop: BdKeys.ID, operator: '=', value: id } ]);
  return bdToType(type);
};

const createRecipeType = async type => await insert(TABLE, typeToBd(type));

const updateRecipeType = async (type, id) => await update(TABLE, typeToBd(type), id);

const deleteRecipeType = async id => await remove(TABLE, id);

module.exports = ({
  listRecipeTypes,
  singleRecipeTypeById,
  createRecipeType,
  updateRecipeType,
  deleteRecipeType,
});
