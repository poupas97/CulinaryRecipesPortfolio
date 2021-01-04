import { array, func, string } from 'prop-types';
import React from 'react';

const MAX_SIZE = 20;

const InputSelect = ({ prop, onChange = () => {}, options }) => {
  if (!prop) return null;

  return (
    <select id={prop} onChange={onChange}>
      <option disabled selected>
        Select
      </option>
      {(options || []).map((it, index) =>
        <option key={index} value={it.value ? it.value : it}>
          {Array.isArray(it.label) ?
            it.label.map(it => it.length < MAX_SIZE ? it : `${it.slice(0, MAX_SIZE)}...`).join(' ')
            : it.label.length < MAX_SIZE ? it : `${it.slice(0, MAX_SIZE)}...`}
        </option>
      )}
    </select>
  );
};

InputSelect.propTypes = {
  prop: string,
  onChange: func,
  options: array
};

export default InputSelect;
