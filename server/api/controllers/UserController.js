const TABLE = 'users';

module.exports = () => {
  const { select, selectSinge, insert, update, remove } = require('../../config/connection');

  const listUsers = async (req, res, next) => {
    return res.status(200).json(await select(TABLE));
  };

  const singleUser = async (req, res, next) => {
    const { params: { id } } = req;
    return res.status(200).json(await selectSinge(TABLE, id));
  };

  const createUser = async (req, res, next) => {
    const { body } = req;
    return res.status(200).json(await insert(TABLE, body));
  };

  const updateUser = async (req, res, next) => {
    const { body, params: { id } } = req;
    return res.status(200).json(await update(TABLE, body, id));
  };

  const deleteUser = async (req, res, next) => {
    const { params: { id } } = req;
    return res.status(200).json(await remove(TABLE, id));
  };

  return { listUsers, singleUser, createUser, updateUser, deleteUser };
}