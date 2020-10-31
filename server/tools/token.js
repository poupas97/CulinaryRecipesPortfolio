const jwt = require('jsonwebtoken');

const generateToken = (user, refresh = false) => {
  const accessToken = jwt.sign(
    user, 
    refresh ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET, 
    { 
      expiresIn: refresh ? process.env.REFRESH_TOKEN_SECRET_EXPIRES : process.env.ACCESS_TOKEN_SECRET_EXPIRES,
    },
  );
  return accessToken
}

const verifyToken = (token, refresh = false) => {
  return jwt.verify(token, refresh ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET, 
    (err, userAuthenticated) => {
      if(err) return null
      return userAuthenticated
    }
  )
}

module.exports = { generateToken, verifyToken };