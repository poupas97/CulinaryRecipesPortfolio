import { array, bool, func, object, string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import InputChipper from '../components/InputChipper';
import InputDate from '../components/InputDate';
import InputEmail from '../components/InputEmail';
import InputMultiSelect from '../components/InputMultiSelect';
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
  MULTI_SELECT: 'multiSelect',
};

const Form = ({ data, inputs = [], onSubmit, onCancel, title, error, loading }) => {
  const [nextItem, setNextItem] = useState();

  useEffect(() => {
    setNextItem(data || {});
  }, [data]);

  const update = (prop, value) => {
    setNextItem({ ...nextItem, [prop]: value });
  };

  const renderContent = (input, index) => {
    let content;

    switch (input.type) {
      default: break;

      case FormInputType.TEXT:
        content = <InputText key={`InputText-${index}`} prop={input.value} onChange={update} data={data} />;
        break;

      case FormInputType.EMAIL:
        content = <InputEmail key={`InputEmail-${index}`} prop={input.value} onChange={update} />;
        break;

      case FormInputType.NUMBER:
        content = <InputNumber key={`InputNumber-${index}`} prop={input.value} onChange={update} />;
        break;

      case FormInputType.DATE:
        content = <InputDate key={`InputDate-${index}`} prop={input.value} onChange={update} />;
        break;

      case FormInputType.SELECT:
        content = (
          <InputSelect
            key={`InputSelect-${index}`}
            prop={input.value}
            onChange={update}
            options={input.options}
            data={data}
          />);
        break;

      case FormInputType.TEXTAREA:
        content = <InputTextArea key={`InputTextArea-${index}`} prop={input.value} onChange={update} />;
        break;

      case FormInputType.CHIPPER:
        content = <InputChipper key={`InputChipper-${index}`} prop={input.value} onChange={update} />;
        break;

      case FormInputType.MULTI_SELECT:
        content = (
          <InputMultiSelect
            key={`InputMultiSelect-${index}`}
            prop={input.value}
            onChange={update}
            options={input.options}
            data={data}
          />);
        break;
    }

    return (
      <div key={`FormItem-${index}`}>
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
      {error && <span>{error}</span>}
      {!!onCancel && <button onClick={onCancel}>Cancel</button>}
      <button onClick={() => onSubmit(nextItem)}>Submit</button>
    </div>
  );
};

Form.propTypes = {
  data: object,
  inputs: array,
  onSubmit: func,
  onCancel: func,
  title: string,
  error: object,
  loading: bool
};

export default Form;
