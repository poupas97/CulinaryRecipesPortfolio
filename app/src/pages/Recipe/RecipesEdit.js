import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { getRecipeAction, recipesSelectors, resetRecipesAction, saveRecipeAction } from '../../store/recipes';
import { RECIPES_LIST_ROUTE } from './RecipesList';

export const RECIPES_EDIT_ROUTE = '/recipes/:id/edit';

const RecipesEdit = ({
  history, getRecipe, recipe, updateRecipe, saved, loading, match: { params: { id } } }) => {

  useEffect(() => {
    if (!recipe) getRecipe(id);
  }, [recipe, getRecipe, id]);

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
      data={recipe}
      inputs={inputs}
      onSubmit={updateRecipe}
      title="Update a Recipe"
      onCancel={goBack}
      loading={loading}
    />
  );
};

RecipesEdit.propTypes = {
  history: object, // eslint-disable-line key-spacing
  getRecipe: func,
  reset: func,
  recipe: object, // eslint-disable-line key-spacing
  updateRecipe: func,
  saved: bool,
  loading: bool,
  match: object, // eslint-disable-line key-spacing
};

const mapStateToProps = state => {
  const { item, loading, saved } = recipesSelectors(state);
  return ({
    recipe: item,
    loading,
    saved,
  });
};

const mapDispatchToProps = dispatch => ({
  reset: () => resetRecipesAction(dispatch),
  getRecipe: id => getRecipeAction(dispatch, id),
  updateRecipe: recipe => saveRecipeAction(dispatch, recipe),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPES_EDIT_ROUTE)
)(RecipesEdit);
