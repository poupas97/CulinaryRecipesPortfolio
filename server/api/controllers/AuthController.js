const { generateToken, verifyToken } = require('../../tools/token');
const { compareHashPassword } = require('../../tools/password');
const UserConnection = require('../../connections/UserConnection');
const { Methods } = require('../routes/constants');
const { errorDtoSimple } = require('../../dto/ErrorDTO');
const { userDtoComplex } = require('../../dto/UserDTO');

const login = async (req, res) => {
  try {
    const { body: { username, password } } = req;

    const user = userDtoComplex(await UserConnection.singleUserByUsername(username));

    if (!user) return res.status(500).json();
    if (!(await compareHashPassword(password, user.password))) return res.status(500).json();

    const accessToken = generateToken(user);
    const refreshToken = generateToken(user, true);
    await UserConnection.updateUser({ accessToken, refreshToken }, user.id);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const needsAuthentication = (method, url) => {
  if (['/api/login', '/api/refresh'].includes(url)) return false;
  if (method === Methods.POST && url === '/api/users') return false;
  return true;
};

const authenticateToken = async (req, res, next) => {
  try {
    const { headers: { authorization }, method, url } = req;

    if (!needsAuthentication(method, url)) next();
    else {
      let token;
      if (authorization) [, token] = authorization.split(' ');
      if (!token) return res.sendStatus(401);

      const userAuthenticated = verifyToken(token);
      if (!userAuthenticated) return res.sendStatus(403);

      const user = await UserConnection.singleUserByUsername(userAuthenticated.username);
      if (user.accessToken !== token) return res.sendStatus(403);

      // eslint-disable-next-line no-param-reassign
      req.userAuthenticated = userAuthenticated;
      next();
    }
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const refresh = async (req, res) => {
  try {
    const { body: { username, password, refreshToken: tokenReceived } } = req;

    const user = userDtoComplex(await UserConnection.singleUserByUsername(username));
    if (!user) return res.status(500).json();
    if (!(await compareHashPassword(password, user.password))) return res.status(500).json();

    const userAuthenticated = verifyToken(tokenReceived, true);
    if (!userAuthenticated) return res.sendStatus(403);

    const accessToken = generateToken(user);
    const refreshToken = generateToken(user, true);
    await UserConnection.updateUser({ accessToken, refreshToken }, user.id);

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const logout = async (req, res) => {
  try {
    const { userAuthenticated } = req;

    const result = await UserConnection.updateUser({ accessToken: '', refreshToken: '' }, userAuthenticated.id);

    return res.status(200).json({ logout: result.updated });
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ login, authenticateToken, refresh, logout });
