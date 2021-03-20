import { func, string } from 'prop-types';
import React from 'react';

const InputTextArea = ({ prop, onChange = () => {} }) => {
  if (!prop) return null;
  return <textarea id={prop} onChange={onChange} rows={3} />;
};

InputTextArea.propTypes = {
  prop: string,
  onChange: func,
};

export default InputTextArea;
