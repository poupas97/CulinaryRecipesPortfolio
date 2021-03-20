import { array, object, string } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { getValue, resolveLink } from '../tools';

const SectionItem = ({ data, headers, link }) => {
  if (!data) return '';

  return (
    <Link to={resolveLink(link, data)}>
      {(headers || []).map((it, index) => (
        <p key={index}>{getValue(it.value, data)}</p>
      ))}
      <hr />
    </Link>
  );
};

SectionItem.propTypes = {
  data: object,
  headers: array,
  link: string,
};

export default SectionItem;
