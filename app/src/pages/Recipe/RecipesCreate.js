import { array, bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { authorsSelectors, listAuthorsAction, resetAuthorsAction } from '../../store/authors';
import { ingredientsSelectors, listIngredientsAction, resetIngredientsAction } from '../../store/ingredients';
import { recipesSelectors, saveRecipeAction } from '../../store/recipes';
import { listRecipeTypesAction, recipeTypesSelectors, resetRecipeTypesAction } from '../../store/recipeTypes';
import { RECIPES_LIST_ROUTE } from './RecipesList';

export const RECIPES_CREATE_ROUTE = '/recipes/create';

const RecipesCreate = ({
  history, createRecipe, saved, error, loading,
  ingredients, listIngredients, resetIngredients,
  authors, listAuthors, resetAuthors,
  recipeTypes, listRecipeTypes, resetRecipeTypes
}) => {

  const goBack = useCallback(() => {
    history.push(RECIPES_LIST_ROUTE);
  }, [history]);

  useEffect(() => {
    if (saved) goBack();
  }, [saved, goBack]);

  useEffect(() => {
    if (!ingredients) listIngredients();
    return () => resetIngredients();
  }, []);

  useEffect(() => {
    if (!authors) listAuthors();
    return () => resetAuthors();
  }, []);

  useEffect(() => {
    if (!recipeTypes) listRecipeTypes();
    return () => resetRecipeTypes();
  }, []);

  const inputs = [
    { text: 'Name', value: 'name', type: FormInputType.TEXT },
    { text: 'Description', value: 'description', type: FormInputType.TEXT },
    { text: 'Ingredients', value: 'ingredients', options: ingredients, type: FormInputType.MULTI_SELECT },
    { text: 'Author', value: 'author', options: authors, type: FormInputType.SELECT },
    { text: 'Recipe Type', value: 'recipeType', options: recipeTypes, type: FormInputType.SELECT },
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

  ingredients: array,
  listIngredients: func,
  resetIngredients: func,

  authors: array,
  listAuthors: func,
  resetAuthors: func,

  recipeTypes: array,
  listRecipeTypes: func,
  resetRecipeTypes: func,
};

const mapStateToProps = state => {
  const { loading, saved } = recipesSelectors(state);
  const { list: authors } = authorsSelectors(state);
  const { list: ingredients } = ingredientsSelectors(state);
  const { list: recipeTypes } = recipeTypesSelectors(state);
  return ({
    loading,
    saved,
    authors,
    ingredients,
    recipeTypes,
  });
};

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => saveRecipeAction(dispatch, recipe),

  listIngredients: () => listIngredientsAction(dispatch),
  resetIngredients: () => resetIngredientsAction(dispatch),

  listAuthors: () => listAuthorsAction(dispatch),
  resetAuthors: () => resetAuthorsAction(dispatch),

  listRecipeTypes: () => listRecipeTypesAction(dispatch),
  resetRecipeTypes: () => resetRecipeTypesAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPES_CREATE_ROUTE),
)(RecipesCreate);
