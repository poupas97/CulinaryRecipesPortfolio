const { select, selectSinge, insert, update, remove } = require('../../config/connection');
const { getHashPassword } = require('../../tools/password');

const TABLE = 'users';

module.exports = () => {
  const listUsers = async (req, res, next) => {
    // console.log(req.userAuthenticated)
    return res.status(200).json(await select(TABLE));
  };

  const singleUser = async (req, res, next) => {
    const { params: { id } } = req;
    return res.status(200).json(await selectSinge(TABLE, id));
  };

  const createUser = async (req, res, next) => {
    const { body: { username, password } } = req;
    const hash = await getHashPassword(password)
    const user = { username, password: hash }
    return res.status(200).json(await insert(TABLE, user));
  };

  const updateUser = async (req, res, next) => {
    const { body: { username, password }, params: { id } } = req;
    const hash = await getHashPassword(password)
    const user = { username, password: hash }
    return res.status(200).json(await update(TABLE, user, id));
  };

  const deleteUser = async (req, res, next) => {
    const { params: { id } } = req;
    return res.status(200).json(await remove(TABLE, id));
  };

  return { listUsers, singleUser, createUser, updateUser, deleteUser };
}