const { getHashPassword } = require('../../tools/password');
const UserConnection = require('../connections/UserConnection');

const listUsers = async (req, res, next) => {
  // console.log(req.userAuthenticated)
  return res.status(200).json(await UserConnection.listUsers());
};

const singleUserById = async (req, res, next) => {
  const { params: { id } } = req;
  return res.status(200).json(await UserConnection.singleUserById(id));
};

const createUser = async (req, res, next) => {
  const { body: { username, password } } = req;
  const hash = await getHashPassword(password)
  return res.status(200).json(await UserConnection.createUser({ username, password: hash }));
};

const updateUser = async (req, res, next) => {
  const { body: { username, password }, params: { id } } = req;
  const hash = await getHashPassword(password)
  return res.status(200).json(await UserConnection.updateUser({ username, password: hash }, id));
};

const deleteUser = async (req, res, next) => {
  const { params: { id } } = req;
  return res.status(200).json(await UserConnection.deleteUser(id));
};

module.exports = () => ({ listUsers, singleUserById, createUser, updateUser, deleteUser });