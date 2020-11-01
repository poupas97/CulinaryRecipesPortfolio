const ErrorMapper = {
  MISS_ID: 'Missing id',
  ER_DUP_ENTRY: 'Duplicate key'
};

const errorDtoSimple = error => {
  const { code } = error || {};
  return { error: ErrorMapper[code] || code || error || true };
};

module.exports = ({ ErrorMapper, errorDtoSimple });
