const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'users';

const listUsers = async () => await select(TABLE);

const singleUserById = async id => {
  const [user] = await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
  return user;
};

const singleUserByUsername = async username => {
  const [user] = await selectSinge(TABLE, [{ prop: 'username', operator: '=', value: username } ]);
  return user;
};

const createUser = async user => await insert(TABLE, user);

const updateUser = async (user, id) => await update(TABLE, user, id);

const deleteUser = async id => await remove(TABLE, id);

module.exports = ({ listUsers, singleUserById, singleUserByUsername, createUser, updateUser, deleteUser });
