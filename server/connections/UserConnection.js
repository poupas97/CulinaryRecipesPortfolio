const get = require('lodash/get');

const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'users';

const DbKeys = {
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

const userToDb = user => {
  const userToSend = {
    [DbKeys.ID]: get(user, ObjectKeys.ID),
    [DbKeys.USERNAME]: get(user, ObjectKeys.USERNAME),
    [DbKeys.PASSWORD]: get(user, ObjectKeys.PASSWORD),
    [DbKeys.NAME]: get(user, ObjectKeys.NAME),
    [DbKeys.ACCESS_TOKEN]: get(user, ObjectKeys.ACCESS_TOKEN),
    [DbKeys.REFRESH_TOKEN]: get(user, ObjectKeys.REFRESH_TOKEN),
    [DbKeys.ACTIVE]: get(user, ObjectKeys.ACTIVE)
  };
  Object.entries(userToSend).forEach(([key, value]) => {
    if (value === undefined) delete userToSend[key];
  });
  return userToSend;
};

const dbToUser = (user = {}) => {
  const userToSend = {
    [ObjectKeys.ID]: get(user, DbKeys.ID),
    [ObjectKeys.USERNAME]: get(user, DbKeys.USERNAME),
    [ObjectKeys.PASSWORD]: get(user, DbKeys.PASSWORD),
    [ObjectKeys.NAME]: get(user, DbKeys.NAME),
    [ObjectKeys.ACCESS_TOKEN]: get(user, DbKeys.ACCESS_TOKEN),
    [ObjectKeys.REFRESH_TOKEN]: get(user, DbKeys.REFRESH_TOKEN),
    [ObjectKeys.ACTIVE]: get(user, DbKeys.ACTIVE)
  };
  Object.entries(userToSend).forEach(([key, value]) => {
    if (value === undefined) delete userToSend[key];
  });
  return userToSend;
};

const listUsers = async () => {
  const users = await select(TABLE);
  return users.map(dbToUser);
};

const singleUserById = async id => {
  const [user] = await selectSinge(TABLE, [{ prop: DbKeys.ID, operator: '=', value: id } ]);
  return dbToUser(user);
};

const singleUserByUsername = async username => {
  const [user] = await selectSinge(TABLE, [{ prop: DbKeys.USERNAME, operator: '=', value: username } ]);
  if (!user) return null;
  return dbToUser(user);
};

const createUser = async user => await insert(TABLE, userToDb(user));

const updateUser = async (user, id) => await update(TABLE, userToDb(user), id);

const deleteUser = async id => await remove(TABLE, [{ prop: DbKeys.ID, operator: '=', value: id }]);

module.exports = ({ listUsers, singleUserById, singleUserByUsername, createUser, updateUser, deleteUser });
