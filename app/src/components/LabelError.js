import get from 'lodash/get';
import { object, string } from 'prop-types';
import React from 'react';

const LabelError = ({ prop, error = {} }) => {
  if (!prop) return null;
  const toShow = get(error, ['errors', prop]);
  return toShow ? <span>{toShow}</span>: null;
};

LabelError.propTypes = {
  prop: string,
  error: object
};

export default LabelError;
