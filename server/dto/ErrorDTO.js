const ErrorMapper = {
  MISS_ID: 'Missing id',
  ER_DUP_ENTRY: 'Duplicate key'
};

const errorDtoSimple = error => {
  const { code, message } = error || {};
  return { code: ErrorMapper[code] || code, message };
};

module.exports = ({ ErrorMapper, errorDtoSimple });
