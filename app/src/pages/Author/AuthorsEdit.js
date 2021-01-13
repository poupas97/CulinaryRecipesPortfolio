import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { getAuthorAction, resetAuthorsAction, saveAuthorAction } from '../../store/authors';
import { AUTHORS_LIST_ROUTE } from './AuthorsList';

export const AUTHORS_EDIT_ROUTE = '/authors/:id/edit';

const AuthorsEdit = ({
  history, getAuthor, author, updateAuthor, saved, loading, match: { params: { id } } }) => {

  useEffect(() => {
    if (!author) getAuthor(id);
  }, [author, getAuthor, id]);

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
      data={author}
      inputs={inputs}
      onSubmit={updateAuthor}
      title="Update a Recipe"
      onCancel={goBack}
      loading={loading}
    />
  );
};

AuthorsEdit.propTypes = {
  history: object, // eslint-disable-line key-spacing
  getAuthor: func,
  reset: func,
  author: object, // eslint-disable-line key-spacing
  updateAuthor: func,
  saved: bool,
  loading: bool,
  match: object, // eslint-disable-line key-spacing
};

const mapStateToProps = state => ({
  loading: state.AUTHORS.loading,
  author: state.AUTHORS.item,
  saved: state.AUTHORS.saved,
});

const mapDispatchToProps = dispatch => ({
  reset: () => resetAuthorsAction(dispatch),
  getAuthor: id => getAuthorAction(dispatch, id),
  updateAuthor: recipe => saveAuthorAction(dispatch, recipe),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(AUTHORS_EDIT_ROUTE)
)(AuthorsEdit);
