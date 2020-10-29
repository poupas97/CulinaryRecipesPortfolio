const querySelectUsers = 'SELECT * from users';
const queryInsertUser = 'INSERT INTO users (username, password) VALUES  (?, ?)';
const queryUpdateUser = "UPDATE users SET username = ?, password = ?, name = ? WHERE id = ?";
const queryDeleteUser = "DELETE FROM users WHERE id = ?";

module.exports = () => {
  const { select, insert, update, remove } = require('../../config/connection');

  const listUsers = async (req, res, next) => {
    return res.status(200).json(await select(querySelectUsers));
  };

  const createUser = async (req, res, next) => {
    return res.status(200).json(await insert(queryInsertUser, ['test', 'pass']));
  };

  const updateUser = async (req, res, next) => {
    // let id = req.params.id;
    return res.status(200).json(await update(queryUpdateUser, ['test2', 'pass2', 'name', 6]));
  };

  const deleteUser = async (req, res, next) => {
    // let id = req.params.id;
    return res.status(200).json(await remove(queryDeleteUser, [6]));
  };

  return { listUsers, createUser, updateUser, deleteUser };
}