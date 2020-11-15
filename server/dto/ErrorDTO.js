const ErrorMapper = {
  MISS_ID: 'Missing id',
  ER_DUP_ENTRY: 'Duplicate key',
  NO_USER: 'No user',
  INVALID_PASSWORD: 'Invalid password',
  NO_PARAMETERS: 'No parameters',
  UNAUTHORIZED: 'Unauthorized',
};

const errorDtoSimple = errorReceived => {
  let errorToSend = null;

  if (typeof errorReceived === 'string') {
    errorToSend = { error: errorReceived };
  } else if (typeof errorReceived === 'object') {
    const { code, message } = errorReceived || {};
    errorToSend = { error: ErrorMapper[code] || code, message };
  }
  return errorToSend;
};

module.exports = ({ ErrorMapper, errorDtoSimple });
