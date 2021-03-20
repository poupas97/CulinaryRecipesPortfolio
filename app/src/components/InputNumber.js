import { func, string } from 'prop-types';
import React from 'react';

const InputNumber = ({ prop, onChange = () => {} }) => {
  if (!prop) return null;
  return <input type='number' id={prop} onChange={onChange} />;
};

InputNumber.propTypes = {
  prop: string,
  onChange: func,
};

export default InputNumber;
