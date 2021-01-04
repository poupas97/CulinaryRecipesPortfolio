import { string } from 'prop-types';
import React from 'react';

const Label = ({ text }) => {
  if (!text) return '';
  return (<span>{text}: </span>);
};

Label.propTypes = {
  text: string
};

export default Label;
