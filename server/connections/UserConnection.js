const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'users';

const KEY_BD_ID = 'id';
const KEY_BD_USERNAME = 'username';
const KEY_BD_PASSWORD	= 'password';
const KEY_BD_NAME = 'name';
const KEY_BD_ACCESS_TOKEN = 'access_token';
const KEY_BD_REFRESH_TOKEN = 'refresh_token';
const KEY_BD_ACTIVE = 'active';

const KEY_ID = 'id';
const KEY_USERNAME = 'username';
const KEY_PASSWORD	= 'password';
const KEY_NAME = 'name';
const KEY_ACCESS_TOKEN = 'accessToken';
const KEY_REFRESH_TOKEN = 'refreshToken';
const KEY_ACTIVE = 'active';

const userToBd = user => {
  const userToSend = {
    [KEY_BD_ID]: user[KEY_ID],
    [KEY_BD_USERNAME]: user[KEY_USERNAME],
    [KEY_BD_PASSWORD]: user[KEY_PASSWORD],
    [KEY_BD_NAME]: user[KEY_NAME],
    [KEY_BD_ACCESS_TOKEN]: user[KEY_ACCESS_TOKEN],
    [KEY_BD_REFRESH_TOKEN]: user[KEY_REFRESH_TOKEN],
    [KEY_BD_ACTIVE]: user[KEY_ACTIVE]
  };
  Object.entries(userToSend).forEach(([key, value]) => {
    if (value === undefined) delete userToSend[key];
  });
  return userToSend;
};

const bdToUser = (user = {}) => {
  const userToSend = {
    [KEY_ID]: user[KEY_BD_ID],
    [KEY_USERNAME]: user[KEY_BD_USERNAME],
    [KEY_PASSWORD]: user[KEY_BD_PASSWORD],
    [KEY_NAME]: user[KEY_BD_NAME],
    [KEY_ACCESS_TOKEN]: user[KEY_BD_ACCESS_TOKEN],
    [KEY_REFRESH_TOKEN]: user[KEY_BD_REFRESH_TOKEN],
    [KEY_ACTIVE]: user[KEY_BD_ACTIVE]
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
  const [user] = await selectSinge(TABLE, [{ prop: KEY_BD_ID, operator: '=', value: id } ]);
  return bdToUser(user);
};

const singleUserByUsername = async username => {
  const [user] = await selectSinge(TABLE, [{ prop: KEY_BD_USERNAME, operator: '=', value: username } ]);
  if (!user) return null;
  return bdToUser(user);
};

const createUser = async user => await insert(TABLE, userToBd(user));

const updateUser = async (user, id) => await update(TABLE, userToBd(user), id);

const deleteUser = async id => await remove(TABLE, id);

module.exports = ({ listUsers, singleUserById, singleUserByUsername, createUser, updateUser, deleteUser });
