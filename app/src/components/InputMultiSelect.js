import get from 'lodash/get';
import { array, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const InputMultiSelect = ({ prop, onChange = () => {}, options, data }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(get(data, prop));
  }, [prop, data]);

  if (!prop) return null;

  const handleChange = selected => {
    const nextValues = selected.map(it => it.value);
    onChange(prop, nextValues);
  };

  return (
    <Select
      defaultValue={value}
      onChange={handleChange}
      options={(options || []).map(it => ({
        value: it,
        label: it.name || it.description,
      }))}
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
