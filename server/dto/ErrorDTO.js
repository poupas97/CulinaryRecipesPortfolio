const ErrorMapper = {
  MISS_ID: 'Missing id',
  ER_DUP_ENTRY: 'Duplicate key',
  BODY_ERROR: 'There are an error in body'
};

const errorDtoSimple = error => {
  const { code, message } = error || {};
  return { code: ErrorMapper[code] || code, message };
};

module.exports = ({ ErrorMapper, errorDtoSimple });
