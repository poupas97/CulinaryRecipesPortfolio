const { getHashPassword } = require('../../tools/password');
const UserConnection = require('../connections/UserConnection');
const { userDtoSimple } = require('../../dto/UserDTO');

// console.log(req.userAuthenticated)

const listUsers = async (req, res) => {
  const result = (await UserConnection.listUsers()).map(userDtoSimple);
  return res.status(200).json(result);
};

const singleUserById = async (req, res) => {
  const { params: { id } } = req;
  const result = userDtoSimple(await UserConnection.singleUserById(id));
  return res.status(200).json(result);
};

const createUser = async (req, res) => {
  const { body: { username, password } } = req;
  const hash = await getHashPassword(password);
  const result = await UserConnection.createUser({ username, password: hash });
  return res.status(200).json(result);
};

const updateUser = async (req, res) => {
  const { body: { username, password }, params: { id } } = req;
  const hash = await getHashPassword(password);
  const result = await UserConnection.updateUser({ username, password: hash }, id);
  return res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  const { params: { id } } = req;
  const result = await UserConnection.deleteUser(id);
  return res.status(200).json(result);
};

module.exports = () => ({ listUsers, singleUserById, createUser, updateUser, deleteUser });
