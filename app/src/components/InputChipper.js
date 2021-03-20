import { func, string } from 'prop-types';
import React, { useState } from 'react';

const InputChipper = ({ prop, onChange = () => {} }) => {
  const [value, setValue] = useState();

  if (!prop) return null;

  const handleOnChange = (e) => {
    const nextValue = e.target.value;
    setValue(nextValue);
    onChange(prop, nextValue);
  };

  return (
    <input type='password' id={prop} onChange={handleOnChange} value={value} />
  );
};

InputChipper.propTypes = {
  prop: string,
  onChange: func,
};

export default InputChipper;
