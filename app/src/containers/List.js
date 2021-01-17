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

  const renderContent = useCallback((row, { value, text, link, action }) => {
    let content = '';

    if (value || text) {
      content = getValue(value, row);
      if (link) {
        content = <Link to={resolveLink(link, row)}>{text || content}</Link>;
      }
      if (action) {
        content = <Link onClick={() => action(row.id)}>{text || content}</Link>;
      }
    }

    return content;
  }, []);

  const renderColumn = useCallback((row, { type, value, link, values, action }) => {
    let content = '';

    switch (type) {
      default:
        content = renderContent(row, { value, link, action });
        break;

      case ColumnType.CONTEXT: {
        const length = values.length;
        content = (values || []).map((it, index) => <>
          {renderContent(row, it)}
          {(index + 1) < length ? ' | ': null}
        </>);
        break;
      }
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
