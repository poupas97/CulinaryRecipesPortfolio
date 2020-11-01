const mapper = {
  'ER_DUP_ENTRY': 'Duplicate key'
};

const errorDtoSimple = error => {
  const { code } = error || {};
  return { error: mapper[code] || code || true };
};

module.exports = ({ errorDtoSimple });
