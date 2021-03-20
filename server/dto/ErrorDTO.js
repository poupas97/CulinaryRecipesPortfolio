const ErrorMapper = {
  MISS_ID: 'Missing id',
  ER_DUP_ENTRY: 'Duplicate key',
  NO_USER: 'No user',
  INVALID_PASSWORD: 'Invalid password',
  NO_PARAMETERS: 'No parameters',
  UNAUTHORIZED: 'Unauthorized',
  ER_NO_SUCH_TABLE: 'Invalid Table',
  ECONNREFUSED: 'Connection Refused',
  ER_BAD_FIELD_ERROR: 'Invalid Field',
};

const MessageMapper = {
  "Cannot read property 'join' of undefined": ErrorMapper.NO_PARAMETERS,
  "Cannot read property 'id' of undefined": ErrorMapper.NO_PARAMETERS,
};

const errorDtoSimple = (errorReceived) => {
  let errorToSend = null;

  if (typeof errorReceived === 'string') {
    errorToSend = { error: errorReceived };
  } else if (typeof errorReceived === 'object') {
    const { code, message } = errorReceived || {};
    errorToSend = {
      error: ErrorMapper[code] || code,
      message: MessageMapper[message] || message,
    };
  }
  return errorToSend;
};

module.exports = { ErrorMapper, errorDtoSimple };
