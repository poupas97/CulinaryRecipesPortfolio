const bcrypt = require('bcrypt')

const getHashPassword = async (text) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(text, salt)
}

const compareHashPassword = async (hashInicial, hashToTest) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(hashInicial, salt)
  return await bcrypt.compare(hashToTest, hash)
}

module.exports = { getHashPassword, compareHashPassword };