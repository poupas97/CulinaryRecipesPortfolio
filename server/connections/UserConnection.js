const get = require('lodash/get');

const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'users';

const BdKeys = {
  ID: 'id',
  USERNAME: 'username',
  PASSWORD: 'password',
  NAME: 'name',
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ACTIVE: 'active',
};

const ObjectKeys = {
  ID: 'id',
  USERNAME: 'username',
  PASSWORD: 'password',
  NAME: 'name',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  ACTIVE: 'active',
};

const userToBd = user => {
  const userToSend = {
    [BdKeys.ID]: get(user, ObjectKeys.ID),
    [BdKeys.USERNAME]: get(user, ObjectKeys.USERNAME),
    [BdKeys.PASSWORD]: get(user, ObjectKeys.PASSWORD),
    [BdKeys.NAME]: get(user, ObjectKeys.NAME),
    [BdKeys.ACCESS_TOKEN]: get(user, ObjectKeys.ACCESS_TOKEN),
    [BdKeys.REFRESH_TOKEN]: get(user, ObjectKeys.REFRESH_TOKEN),
    [BdKeys.ACTIVE]: get(user, ObjectKeys.ACTIVE)
  };
  Object.entries(userToSend).forEach(([key, value]) => {
    if (value === undefined) delete userToSend[key];
  });
  return userToSend;
};

const bdToUser = (user = {}) => {
  const userToSend = {
    [ObjectKeys.ID]: get(user, BdKeys.ID),
    [ObjectKeys.USERNAME]: get(user, BdKeys.USERNAME),
    [ObjectKeys.PASSWORD]: get(user, BdKeys.PASSWORD),
    [ObjectKeys.NAME]: get(user, BdKeys.NAME),
    [ObjectKeys.ACCESS_TOKEN]: get(user, BdKeys.ACCESS_TOKEN),
    [ObjectKeys.REFRESH_TOKEN]: get(user, BdKeys.REFRESH_TOKEN),
    [ObjectKeys.ACTIVE]: get(user, BdKeys.ACTIVE)
  };
  Object.entries(userToSend).forEach(([key, value]) => {
    if (value === undefined) delete userToSend[key];
  });
  return userToSend;
};

const listUsers = async () => {
  const users = await select(TABLE);
  return users.map(bdToUser);
};

const singleUserById = async id => {
  const [user] = await selectSinge(TABLE, [{ prop: BdKeys.ID, operator: '=', value: id } ]);
  return bdToUser(user);
};

const singleUserByUsername = async username => {
  const [user] = await selectSinge(TABLE, [{ prop: BdKeys.USERNAME, operator: '=', value: username } ]);
  if (!user) return null;
  return bdToUser(user);
};

const createUser = async user => await insert(TABLE, userToBd(user));

const updateUser = async (user, id) => await update(TABLE, userToBd(user), id);

const deleteUser = async id => await remove(TABLE, id);

module.exports = ({ listUsers, singleUserById, singleUserByUsername, createUser, updateUser, deleteUser });
