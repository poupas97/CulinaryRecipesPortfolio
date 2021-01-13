import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List, { ColumnType } from '../../containers/List';
import { withPage } from '../../contexts/Page';
import { authorsSelectors, listAuthorsAction, resetAuthorsAction } from '../../store/authors';
import { AUTHORS_CREATE_ROUTE } from './AuthorsCreate';
import { AUTHORS_DETAILS_ROUTE } from './AuthorsDetails';
import { AUTHORS_EDIT_ROUTE } from './AuthorsEdit';

export const AUTHORS_LIST_ROUTE = '/authors';

const AuthorsList = ({ authors, listAuthors, loading, reset }) => {

  useEffect(() => {
    reset();
    return () => reset();
  }, []);

  useEffect(() => {
    if (!authors) listAuthors();
  }, [authors, listAuthors]);

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Options', type: ColumnType.CONTEXT, values: [
      { text: 'details', link: AUTHORS_DETAILS_ROUTE },
      { text: 'edit', link: AUTHORS_EDIT_ROUTE },
    ] },
  ];

  return (
    <List
      headers={headers}
      rows={authors}
      loading={loading}
      canAdd={AUTHORS_CREATE_ROUTE}
    />
  );
};

AuthorsList.propTypes = {
  authors: array,
  listAuthors: func,
  loading: bool,
  reset: func,
};

const mapStateToProps = state => {
  const data = authorsSelectors(state);
  return ({
    authors: data.list,
    loading: data.loading,
  });
};

const mapActionsToProps = dispatch => ({
  listAuthors: () => listAuthorsAction(dispatch),
  reset: () => resetAuthorsAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(AUTHORS_LIST_ROUTE)
)(AuthorsList);
