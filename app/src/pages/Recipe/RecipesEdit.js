import { array, bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import {
  authorsSelectors,
  listAuthorsAction,
  resetAuthorsAction,
} from '../../store/authors';
import {
  ingredientsSelectors,
  listIngredientsAction,
  resetIngredientsAction,
} from '../../store/ingredients';
import {
  getRecipeAction,
  recipesSelectors,
  saveRecipeAction,
} from '../../store/recipes';
import {
  listRecipeTypesAction,
  recipeTypesSelectors,
  resetRecipeTypesAction,
} from '../../store/recipeTypes';
import { RECIPES_LIST_ROUTE } from './RecipesList';

export const RECIPES_EDIT_ROUTE = '/recipes/:id/edit';

const RecipesEdit = ({
  history,
  match: {
    params: { id },
  },
  recipe,
  getRecipe,
  updateRecipe,
  saved,
  error,
  loading,
  ingredients,
  listIngredients,
  resetIngredients,
  authors,
  listAuthors,
  resetAuthors,
  recipeTypes,
  listRecipeTypes,
  resetRecipeTypes,
}) => {
  useEffect(() => {
    if (!recipe) getRecipe(id);
  }, [recipe, getRecipe, id]);

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
    {
      text: 'Ingredients',
      value: 'ingredients',
      options: ingredients,
      type: FormInputType.MULTI_SELECT,
    },
    {
      text: 'Author',
      value: 'author',
      options: authors,
      type: FormInputType.SELECT,
    },
    {
      text: 'Recipe Type',
      value: 'recipeType',
      options: recipeTypes,
      type: FormInputType.SELECT,
    },
  ];

  return (
    <Form
      data={recipe}
      inputs={inputs}
      onSubmit={updateRecipe}
      title='Update a Recipe'
      onCancel={goBack}
      loading={loading}
      error={error}
    />
  );
};

RecipesEdit.propTypes = {
  history: object, // eslint-disable-line key-spacing
  match: object, // eslint-disable-line key-spacing

  recipe: object, // eslint-disable-line key-spacing
  getRecipe: func,
  updateRecipe: func,
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

const mapStateToProps = (state) => {
  const { item: recipe, loading, saved } = recipesSelectors(state);
  const { list: authors } = authorsSelectors(state);
  const { list: ingredients } = ingredientsSelectors(state);
  const { list: recipeTypes } = recipeTypesSelectors(state);
  return {
    recipe,
    loading,
    saved,
    authors,
    ingredients,
    recipeTypes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRecipe: (id) => getRecipeAction(dispatch, id),
  updateRecipe: (recipe) => saveRecipeAction(dispatch, recipe),

  listIngredients: () => listIngredientsAction(dispatch),
  resetIngredients: () => resetIngredientsAction(dispatch),

  listAuthors: () => listAuthorsAction(dispatch),
  resetAuthors: () => resetAuthorsAction(dispatch),

  listRecipeTypes: () => listRecipeTypesAction(dispatch),
  resetRecipeTypes: () => resetRecipeTypesAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPES_EDIT_ROUTE)
)(RecipesEdit);
