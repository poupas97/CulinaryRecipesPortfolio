const { select, selectSinge, insert, update, remove } = require('../../config/connection');

const TABLE = 'users';

const listUsers = async () => {
  return await select(TABLE);
};

const singleUser = async (id) => {
  return await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
};

const createUser = async (user) => {
  return await insert(TABLE, user);
};

const updateUser = async (user, id) => {
  return await update(TABLE, user, id);
};

const deleteUser = async (id) => {
  return await remove(TABLE, id);
};

module.exports = ({  listUsers, singleUser, createUser, updateUser, deleteUser });