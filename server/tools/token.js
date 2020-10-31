const jwt = require('jsonwebtoken');

const generateToken = (user, refresh = false) => {
  const expiresIn = refresh ? process.env.REFRESH_TOKEN_SECRET_EXPIRES : process.env.ACCESS_TOKEN_SECRET_EXPIRES;
  return jwt.sign(
    user,
    refresh ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: expiresIn * 60 * 1000 }
  );
};

const verifyToken = (token, refresh = false) =>
  jwt.verify(token, refresh ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    (err, userAuthenticated) => {
      if (err) return null;
      return userAuthenticated;
    }
  );

module.exports = { generateToken, verifyToken };
