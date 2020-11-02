const ErrorMapper = {
  MISS_ID: 'Missing id',
  ER_DUP_ENTRY: 'Duplicate key'
};

const errorDtoSimple = error => {
  const { code, message } = error || {};
  return { error: ErrorMapper[code] || message || true };
};

module.exports = ({ ErrorMapper, errorDtoSimple });
