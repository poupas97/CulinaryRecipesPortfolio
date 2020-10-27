const selectUsers = 'SELECT * from users'

module.exports = () => {
  const { select } = require('../../config/connection');

  const list = async (req, res) => res.status(200).json(await select(selectUsers));

  return { list };
}