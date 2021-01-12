const userDtoSimple = user => {
  if (!user) return null;
  const { id, username, name } = user;
  return { id, username, name };
};

const userDtoComplex = user => {
  if (!user) return null;
  const { id, username, password, name } = user;
  return { id, username, password, name };
};

// const userTokenToBd = user => {
//   if (!user) return null;
//   const { accessToken, refreshToken } = user || {};
//   return { access_token: accessToken, refresh_token: refreshToken };
// };

// const userTokenFromBd = user => {
//   if (!user) return null;
//   const { access_token, refresh_token } = user || {};
//   return { accessToken: access_token, refreshToken: refresh_token };
// };

module.exports = ({ userDtoSimple, userDtoComplex, /*userTokenToBd, userTokenFromBd*/ });
