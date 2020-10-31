const { getHashPassword } = require('../../tools/password');
const UserModel = require('../models/UserModel');

const listUsers = async (req, res, next) => {
  // console.log(req.userAuthenticated)
  return res.status(200).json(await UserModel.listUsers());
};

const singleUserById = async (req, res, next) => {
  const { params: { id } } = req;
  return res.status(200).json(await UserModel.singleUserById(id));
};

const createUser = async (req, res, next) => {
  const { body: { username, password } } = req;
  const hash = await getHashPassword(password)
  return res.status(200).json(await UserModel.createUser({ username, password: hash }));
};

const updateUser = async (req, res, next) => {
  const { body: { username, password }, params: { id } } = req;
  const hash = await getHashPassword(password)
  return res.status(200).json(await UserModel.updateUser({ username, password: hash }, id));
};

const deleteUser = async (req, res, next) => {
  const { params: { id } } = req;
  return res.status(200).json(await UserModel.deleteUser(id));
};

module.exports = () => ({ listUsers, singleUserById, createUser, updateUser, deleteUser });