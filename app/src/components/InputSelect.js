import get from 'lodash/get';
import { array, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const InputSelect = ({ prop, onChange = () => {}, options, data }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(get(data, prop));
  }, [prop, data]);

  if (!prop) return null;

  const handleChange = selected => {
    onChange(prop, selected.value);
  };

  return (
    <Select
      defaultValue={value}
      onChange={handleChange}
      options={(options || []).map(it => ({
        value: it,
        label: it.name || it.description,
      }))}
    />
  );
};

InputSelect.propTypes = {
  prop: string,
  onChange: func,
  options: array,
  data: array,
};

export default InputSelect;
