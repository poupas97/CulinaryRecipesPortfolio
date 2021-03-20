import { bool, func, object } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Detail from '../../containers/Detail';
import { withPage } from '../../contexts/Page';
import {
  authorsSelectors,
  getAuthorAction,
  resetAuthorsAction,
} from '../../store/authors';

export const AUTHORS_DETAILS_ROUTE = '/authors/:id/details';

const AuthorsDetails = ({
  author,
  getAuthor,
  match: {
    params: { id },
  },
  loading,
  reset,
}) => {
  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    if (!author) getAuthor(id);
  }, [author, getAuthor, id]);

  const labels = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
  ];

  return (
    <Detail
      labels={labels}
      item={author}
      title='Author Details'
      loading={loading}
    />
  );
};

AuthorsDetails.propTypes = {
  author: object,
  getAuthor: func,
  loading: bool,
  reset: func,
  match: object,
};

const mapStateToProps = (state) => {
  const { item, loading } = authorsSelectors(state);
  return {
    author: item,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => resetAuthorsAction(dispatch),
  getAuthor: (id) => getAuthorAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(AUTHORS_DETAILS_ROUTE)
)(AuthorsDetails);
