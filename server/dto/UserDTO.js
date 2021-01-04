const userDtoSimple = user => {
  const { id, username, name, active } = user || {};
  return { id, username, name, active };
};

const userDtoComplex = user => {
  if (!user) return null;
  const { id, username, password, name } = user || {};
  return { id, username, password, name };
};

module.exports = ({ userDtoSimple, userDtoComplex });
