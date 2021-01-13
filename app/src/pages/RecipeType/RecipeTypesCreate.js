import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { recipeTypesSelectors, resetRecipeTypesAction, saveRecipeTypeAction } from '../../store/recipeTypes';
import { RECIPE_TYPES_LIST_ROUTE } from './RecipeTypesList';

export const RECIPE_TYPES_CREATE_ROUTE = '/recipe-types/create';

const RecipeTypesCreate = ({ history, createRecipeType, saved, error, loading }) => {

  const goBack = useCallback(() => {
    history.push(RECIPE_TYPES_LIST_ROUTE);
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
      onSubmit={createRecipeType}
      title="Create a Recipe Type"
      onCancel={goBack}
      error={error}
      loading={loading}
    />
  );
};

RecipeTypesCreate.propTypes = {
  history: object, // eslint-disable-line key-spacing
  createRecipeType: func,
  saved: bool,
  error: bool,
  loading: bool,
};

const mapStateToProps = state => {
  const { loading, saved } = recipeTypesSelectors(state);
  return ({
    loading,
    saved,
  });
};

const mapDispatchToProps = dispatch => ({
  reset: () => resetRecipeTypesAction(dispatch),
  createRecipeType: recipeType => saveRecipeTypeAction(dispatch, recipeType),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPE_TYPES_CREATE_ROUTE),
)(RecipeTypesCreate);
