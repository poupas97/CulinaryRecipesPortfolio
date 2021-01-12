import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { resetRecipesAction, saveRecipeAction } from '../../store/recipes';
import { RECIPES_LIST_ROUTE } from './RecipesList';

export const RECIPES_CREATE_ROUTE = '/recipes/create';

const RecipesCreate = ({ history, createRecipe, saved, error, loading }) => {

  const goBack = useCallback(() => {
    history.push(RECIPES_LIST_ROUTE);
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
      onSubmit={createRecipe}
      title="Create a Recipe"
      onCancel={goBack}
      error={error}
      loading={loading}
    />
  );
};

RecipesCreate.propTypes = {
  history: object, // eslint-disable-line key-spacing
  createRecipe: func,
  saved: bool,
  error: bool,
  loading: bool,
};

const mapStateToProps = state => ({
  loading: state.RECIPES.loading,
  saved: state.RECIPES.saved,
});

const mapDispatchToProps = dispatch => ({
  reset: () => resetRecipesAction(dispatch),
  createRecipe: recipe => saveRecipeAction(dispatch, recipe),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPES_CREATE_ROUTE),
)(RecipesCreate);
