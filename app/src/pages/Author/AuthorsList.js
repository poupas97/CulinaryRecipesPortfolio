import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List, { ColumnType } from '../../containers/List';
import { withPage } from '../../contexts/Page';
import { listAuthorsAction, resetAuthorsAction } from '../../store/authors';

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
      // { text: 'details', link: INGREDIENTS_DETAILS_ROUTE },
      // { text: 'edit', link: INGREDIENTS_EDIT_ROUTE },
    ] },
  ];

  return (
    <List
      headers={headers}
      rows={authors}
      loading={loading}
      // canAdd={INGREDIENTS_CREATE_ROUTE}
    />
  );
};

AuthorsList.propTypes = {
  authors: array,
  listAuthors: func,
  loading: bool,
  reset: func,
};

const mapStateToProps = state => ({
  authors: state.AUTHORS.list,
  loading: state.AUTHORS.loading,
});

const mapActionsToProps = dispatch => ({
  listAuthors: () => listAuthorsAction(dispatch),
  reset: () => resetAuthorsAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(AUTHORS_LIST_ROUTE)
)(AuthorsList);
