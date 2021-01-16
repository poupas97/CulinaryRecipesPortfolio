import get from 'lodash/get';
import { array, bool, object, string } from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Label from '../components/Label';
import { getValue } from '../tools';
import List from './List';

const Detail = ({ labels, item = {}, title, loading }) => {
  const history = useHistory();

  return (
    <div className="details">
      {loading && <div className="loader" />}
      {!!title && <h2>{title}</h2>}
      {labels.filter(it => it.value).map(it => (<>
        <Label text={it.text} />{getValue(it.value, item)}
        <br />
      </>))}
      {labels.filter(it => it.list).map(it => (<>
        <List
          title={it.text}
          headers={it.headers}
          rows={get(item, it.list)}
        />
      </>))}
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
};

Detail.propTypes = {
  labels: array,
  item: object,
  title: string,
  loading: bool
};

export default Detail;
