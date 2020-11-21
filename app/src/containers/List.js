import { array, bool, func, string } from 'prop-types';
import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getValue, resolveLink } from '../tools';

import './list.scss';

export const ColumnType = {
  CONTEXT: 'context',
};

const List = ({ headers, rows, title, canAdd, loading }) => {
  const history = useHistory();

  const renderContent = useCallback((row, { value, text, link }) => {
    let content = '';

    if (value || text) {
      content = getValue(value || text, row);
      if (link) {
        content = <Link to={resolveLink(link, row)}>{content}</Link>;
      }
    }

    return content;
  }, []);

  const renderColumn = useCallback((row, { type, value, link, values }) => {
    let content = '';

    switch (type) {
      default:
        content = renderContent(row, { type, value, link });
        break;

      case ColumnType.CONTEXT:
        content = (values || []).map(it => <span key={it.text}>{it.text}</span>);
        break;
    }

    return content;
  }, []);

  return (
    <div className="list">
      {loading && <div className="loader" />}
      {!!title && <h2>{title}</h2>}
      <div className="actions">
        {!!canAdd && <button onClick={() => history.push(canAdd)}>Add</button>}
      </div>
      <table>
        <thead>
          {(headers || []).map(header => <th key={header.text}>{header.text}</th>)}
        </thead>
        {(rows || []).map((row, indexRow) => (
          <tr key={indexRow}>
            {(headers || []).map((header, indexHeader) =>
              <td key={`${indexRow}-${indexHeader}`}>{renderColumn(row, header)}</td>)}
          </tr>
        ))}
      </table>
    </div>
  );
};

List.propTypes = {
  headers: array,
  rows: array,
  title: string,
  getList: func,
  canAdd: bool,
  loading: bool
};

export default List;
