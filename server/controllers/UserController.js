const { getHashPassword } = require('../tools/password');
const UserConnection = require('../connections/UserConnection');
const { userDtoSimple } = require('../dto/UserDTO');
const { errorDtoSimple } = require('../dto/ErrorDTO');

// console.log(req.userAuthenticated)

const listUsers = async (req, res) => {
  try {
    const result = (await UserConnection.listUsers()).map(userDtoSimple);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const singleUserById = async (req, res) => {
  try {
    const { params: { id } } = req;
    const result = userDtoSimple(await UserConnection.singleUserById(id));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const createUser = async (req, res) => {
  try {
    const { body: { username, password } } = req;
    const hash = await getHashPassword(password);
    const result = await UserConnection.createUser({ username, password: hash });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const updateUser = async (req, res) => {
  try {
    const { body: { username, password }, params: { id } } = req;
    const hash = await getHashPassword(password);
    const result = await UserConnection.updateUser({ username, password: hash }, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { params: { id } } = req;
    const result = await UserConnection.deleteUser(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ listUsers, singleUserById, createUser, updateUser, deleteUser });
