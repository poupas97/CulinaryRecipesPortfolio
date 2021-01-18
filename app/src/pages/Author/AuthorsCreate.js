import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { authorsSelectors, resetAuthorsAction, saveAuthorAction } from '../../store/authors';
import { AUTHORS_LIST_ROUTE } from './AuthorsList';

export const AUTHORS_CREATE_ROUTE = '/authors/create';

const AuthorsCreate = ({ history, createAuthor, saved, error, loading }) => {

  const goBack = useCallback(() => {
    history.push(AUTHORS_LIST_ROUTE);
  }, [history]);

  useEffect(() => {
    if (saved) goBack();
  }, [saved, goBack]);

  const inputs = [
    { text: 'Name', value: 'name', type: FormInputType.TEXT },
    { text: 'Description', value: 'description', type: FormInputType.TEXT },
  ];

  return (
    <Form
      inputs={inputs}
      onSubmit={createAuthor}
      title="Create an Author"
      onCancel={goBack}
      error={error}
      loading={loading}
    />
  );
};

AuthorsCreate.propTypes = {
  history: object, // eslint-disable-line key-spacing
  createAuthor: func,
  saved: bool,
  error: bool,
  loading: bool,
};

const mapStateToProps = state => {
  const { loading, saved, error } = authorsSelectors(state);
  return ({
    loading,
    saved,
    error,
  });
};

const mapDispatchToProps = dispatch => ({
  reset: () => resetAuthorsAction(dispatch),
  createAuthor: author => saveAuthorAction(dispatch, author),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(AUTHORS_CREATE_ROUTE),
)(AuthorsCreate);
