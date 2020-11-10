import { func, string } from 'prop-types';
import React from 'react';

const InputText = ({ prop, onChange = () => {} }) => {
  if (!prop) return null;
  return <input type="text" id={prop} onChange={onChange} />;
};

InputText.propTypes = {
  prop: string,
  onChange: func
};

export default InputText;
