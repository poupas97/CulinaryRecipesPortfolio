import { func, string } from 'prop-types';
import React from 'react';

const InputEmail = ({ prop, onChange = () => {} }) => {
  if (!prop) return null;
  return <input type="email" id={prop} onChange={onChange} />;
};

InputEmail.propTypes = {
  prop: string,
  onChange: func
};

export default InputEmail;
