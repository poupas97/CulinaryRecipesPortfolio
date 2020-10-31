const bcrypt = require('bcrypt')

const getHashPassword = async (text) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(text, salt)
}

const compareHashPassword = async (text, hashToTest) => {
  return await bcrypt.compare(text, hashToTest)
}

module.exports = { getHashPassword, compareHashPassword };