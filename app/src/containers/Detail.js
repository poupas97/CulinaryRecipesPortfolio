import get from 'lodash/get';
import { array, bool, object, string } from 'prop-types';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import Label from '../components/Label';
import { getValue } from '../tools';
import List from './List';

const Detail = ({ labels, item = {}, title, onBack, loading }) => {
  const history = useHistory();

  const items = useMemo(() => labels.filter(it => it.value), [labels]);
  const list = useMemo(() => labels.filter(it => it.list), [labels]);

  return (
    <div className="details">
      {loading && <div className="loader" />}
      {!!title && <h2>{title}</h2>}
      {items.map(it => (<>
        <Label text={it.text} />{getValue(it.value, item)}
        <br />
      </>))}
      {list.map(it => (<>
        <List
          title={it.text}
          headers={it.headers}
          data={get(item, it.list)}
        />
      </>))}
      {!!onBack && <button onClick={() => history.goBack()}>Back</button>}
    </div>
  );
};

Detail.propTypes = {
  labels: array,
  item: object,
  title: string,
  onBack: bool,
  loading: bool
};

export default Detail;
