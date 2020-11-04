const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'types';

const KEY_BD_ID = 'id';
const KEY_BD_NAME = 'name';
const KEY_BD_DESCRIPTION = 'description';
const KEY_BD_ACTIVE = 'active';

const KEY_ID = 'id';
const KEY_NAME = 'name';
const KEY_DESCRIPTION = 'description';
const KEY_ACTIVE = 'active';

const typeToBd = type => {
  const typeToSend = {
    [KEY_BD_ID]: type[KEY_ID],
    [KEY_BD_NAME]: type[KEY_NAME],
    [KEY_BD_DESCRIPTION]: type[KEY_DESCRIPTION],
    [KEY_BD_ACTIVE]: type[KEY_ACTIVE]
  };
  Object.entries(typeToSend).forEach(([key, value]) => {
    if (value === undefined) delete typeToSend[key];
  });
  return typeToSend;
};

const bdToType = (type = {}) => {
  const typeToSend = {
    [KEY_ID]: type[KEY_BD_ID],
    [KEY_NAME]: type[KEY_BD_NAME],
    [KEY_DESCRIPTION]: type[KEY_BD_DESCRIPTION],
    [KEY_ACTIVE]: type[KEY_BD_ACTIVE]
  };
  Object.entries(typeToSend).forEach(([key, value]) => {
    if (value === undefined) delete typeToSend[key];
  });
  return typeToSend;
};

const listTypes = async () => {
  const types = await select(TABLE);
  return types.map(bdToType);
};

const singleTypeById = async id => {
  const [type] = await selectSinge(TABLE, [{ prop: KEY_BD_ID, operator: '=', value: id } ]);
  return bdToType(type);
};

const createType = async type => await insert(TABLE, typeToBd(type));

const updateType = async (type, id) => await update(TABLE, typeToBd(type), id);

const deleteType = async id => await remove(TABLE, id);

module.exports = ({ listTypes, singleTypeById, createType, updateType, deleteType });
