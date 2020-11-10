import { func, string } from 'prop-types';
import React from 'react';

const InputChipper = ({ prop, onChange = () => {} }) => {
  if (!prop) return null;
  return <input type="password" id={prop} onChange={onChange} />;
};

InputChipper.propTypes = {
  prop: string,
  onChange: func
};

export default InputChipper;
