import { array, bool, func, string } from 'prop-types';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import SectionItem from '../components/SectionItem';
// import { getValue, resolveLink } from '../tools';

import './section.scss';

export const ColumnType = {
  CONTEXT: 'context',
};

const Section = ({ headers, rows, link, title, canAdd, loading }) => {
  const history = useHistory();

  return (
    <div className='section'>
      {loading && <div className='loader' />}
      {!!title && <h2>{title}</h2>}
      <div className='actions'>
        {!!canAdd && <button onClick={() => history.push(canAdd)}>Add</button>}
      </div>
      <section>
        <div className='left'>
          {(rows || []).map((it, index) => (
            <SectionItem
              key={`SectionItem-${index}`}
              data={it}
              headers={headers}
              link={link}
            />
          ))}
        </div>
        <div className='right'>
          <Route path={link}>a</Route>
        </div>
      </section>
    </div>
  );
};

Section.propTypes = {
  headers: array,
  rows: array,
  link: string,
  title: string,
  getList: func,
  canAdd: bool,
  loading: bool,
};

export default Section;
