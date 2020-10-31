const { generateToken, verifyToken } = require('../../tools/token');
const { compareHashPassword } = require('../../tools/password');
const UserConnection = require('../connections/UserConnection');

const login = async (req, res, next) => {
  const { body: { username, password } } = req;

  const user = await UserConnection.singleUserByUsername(username);
  if(!user) return res.status(500).json();
  if(!(await compareHashPassword(password, user.password))) return res.status(500).json();

  const accessToken = generateToken({ username, password })
  const refreshToken = generateToken({ username, password }, true)
  await UserConnection.updateUser({ accessToken, refreshToken }, user.id);
  
  return res.status(200).json({ accessToken, refreshToken });
};
    
const authenticateToken = (req, res, next) => {
  const { headers: { authorization }, originalUrl } = req;
  
  if(['/api/login', '/api/refresh'].includes(originalUrl)) next();
  else {
    let token; 
    if(authorization) [, token] = authorization.split(' ');
    if(!token) return res.sendStatus(401);
    
    const userAuthenticated = verifyToken(token)
    if(!userAuthenticated) return res.sendStatus(403);

    req.userAuthenticated = userAuthenticated
    next();
  }
}

const refresh = async (req, res, next) => {
  const { body: { username, password, refreshToken: tokenReceived } } = req;

  const user = await UserConnection.singleUserByUsername(username);
  if(!user) return res.status(500).json();
  if(!(await compareHashPassword(password, user.password))) return res.status(500).json();

  const userAuthenticated = verifyToken(tokenReceived, true)
  if(!userAuthenticated) return res.sendStatus(403);

  const accessToken = generateToken({ username, password })
  const refreshToken = generateToken({ username, password }, true)
  await UserConnection.updateUser({ accessToken, refreshToken }, user.id);

  return res.status(200).json({ accessToken, refreshToken });
};

const logout = async (req, res, next) => {
  const { body: { username } } = req;

  const user = await UserConnection.singleUserByUsername(username);
  if(!user) return res.status(500).json();

  await UserConnection.updateUser({ accessToken : "", refreshToken: "" }, user.id);

  return res.status(200).json();
};

module.exports = () => ({ login, authenticateToken, refresh, logout });