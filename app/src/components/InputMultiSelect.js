import get from 'lodash/get';
import { array, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getOption } from '../tools';

const InputMultiSelect = ({ prop, onChange = () => {}, options, data }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(get(data, prop));
  }, [prop, data]);

  if (!prop) return null;

  const handleChange = (selected) => {
    const nextValues = (selected || []).map((it) => it.value);
    setValue(nextValues);
    onChange(prop, nextValues);
  };

  return (
    <Select
      value={(value || []).map(getOption)}
      onChange={handleChange}
      options={(options || []).map(getOption)}
      isMulti
    />
  );
};

InputMultiSelect.propTypes = {
  prop: string,
  onChange: func,
  options: array,
  data: array,
};

export default InputMultiSelect;
