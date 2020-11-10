import { array, bool, func, object, string } from 'prop-types';
import React, { useState } from 'react';

import InputChipper from '../components/InputChipper';
import InputDate from '../components/InputDate';
import InputEmail from '../components/InputEmail';
import InputNumber from '../components/InputNumber';
import InputSelect from '../components/InputSelect';
import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';
import Label from '../components/Label';
import LabelError from '../components/LabelError';

export const FormInputType = {
  TEXT: 'text',
  NUMBER: 'number',
  EMAIL: 'email',
  DATE: 'date',
  SELECT: 'select',
  TEXTAREA: 'textArea',
  CHIPPER: 'chipper',
};

const Form = ({ inputs = [], onSubmit, onCancel, title, error, loading }) => {
  const [nextItem, setNextItem] = useState({});

  const update = e => {
    setNextItem({ ...nextItem, [e.target.id]: e.target.value });
  };

  const renderContent = input => {
    let content;

    switch (input.type) {
      default: break;

      case FormInputType.TEXT:
        content = <InputText prop={input.value} onChange={update} />;
        break;

      case FormInputType.EMAIL:
        content = <InputEmail prop={input.value} onChange={update} />;
        break;

      case FormInputType.NUMBER:
        content = <InputNumber prop={input.value} onChange={update} />;
        break;

      case FormInputType.DATE:
        content = <InputDate prop={input.value} onChange={update} />;
        break;

      case FormInputType.SELECT:
        content = <InputSelect prop={input.value} onChange={update} options={input.options} />;
        break;

      case FormInputType.TEXTAREA:
        content = <InputTextArea prop={input.value} onChange={update} />;
        break;

      case FormInputType.CHIPPER:
        content = <InputChipper prop={input.value} onChange={update} />;
        break;
    }

    return (
      <div>
        <Label text={input.text} />
        {content}
        <LabelError prop={input.value} error={error} />
        <br />
      </div>
    );
  };

  return (
    <div>
      {loading && <div />}
      <h2>{title ? title : null}</h2>
      {inputs.map(renderContent)}
      <br />
      {error && <span>{error.message}</span>}
      {!!onCancel && <button onClick={onCancel}>Cancel</button>}
      <button onClick={() => onSubmit(nextItem)}>Submit</button>
    </div>
  );
};

Form.propTypes = {
  inputs: array,
  onSubmit: func,
  onCancel: func,
  title: string,
  error: object,
  loading: bool
};

export default Form;
