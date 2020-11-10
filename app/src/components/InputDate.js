import { func, string } from 'prop-types';
import React from 'react';

const InputDate = ({ prop, onChange = () => {} }) => {
  if (!prop) return null;
  return <input type="date" id={prop} onChange={onChange} />;
};

InputDate.propTypes = {
  prop: string,
  onChange: func
};

export default InputDate;
