const userDtoSimple = user => {
  const { id, username, name } = user || {};
  return { id, username, name };
};

const userDtoComplex = user => {
  const { id, username, password, name } = user || {};
  return { id, username, password, name };
};

module.exports = ({ userDtoSimple, userDtoComplex });
