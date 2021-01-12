import get from 'lodash/get';
import { func, object, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

const InputText = ({ prop, onChange = () => {}, data }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(get(data, prop));
  }, [prop, data]);

  const handleOnChange = e => {
    const nextValue = e.target.value;
    setValue(nextValue);
    onChange(e);
  };

  if (!prop) return null;
  return <input type="text" id={prop} onChange={handleOnChange} value={value || ''} />;
};

InputText.propTypes = {
  prop: string,
  onChange: func,
  data: object, // eslint-disable-line key-spacing
};

export default InputText;
