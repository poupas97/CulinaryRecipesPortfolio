import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List, { ColumnType } from '../../containers/List';
import { withPage } from '../../contexts/Page';
import { addFavoriteAction } from '../../store/favorites';
import {
  listRecipesAction,
  recipesSelectors,
  removeRecipeAction,
  resetRecipesAction,
} from '../../store/recipes';
import { RECIPES_CREATE_ROUTE } from './RecipesCreate';
import { RECIPES_DETAILS_ROUTE } from './RecipesDetails';
import { RECIPES_EDIT_ROUTE } from './RecipesEdit';

export const RECIPES_LIST_ROUTE = '/recipes';

const RecipesList = ({
  recipes,
  listRecipes,
  loading,
  reset,
  removeRecipe,
  addFavorite,
}) => {
  useEffect(() => {
    reset();
    return () => reset();
  }, []);

  useEffect(() => {
    if (!recipes) listRecipes();
  }, [recipes, listRecipes]);

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    {
      text: 'Options',
      type: ColumnType.CONTEXT,
      values: [
        { text: 'details', link: RECIPES_DETAILS_ROUTE },
        { text: 'edit', link: RECIPES_EDIT_ROUTE },
        { text: 'remove', action: removeRecipe },
        { text: 'favorite', action: addFavorite },
      ],
    },
  ];

  return (
    <List
      headers={headers}
      rows={recipes}
      loading={loading}
      canAdd={RECIPES_CREATE_ROUTE}
    />
  );
};

RecipesList.propTypes = {
  recipes: array,
  listRecipes: func,
  loading: bool,
  reset: func,
  removeRecipe: func,
  addFavorite: func,
};

const mapStateToProps = (state) => {
  const data = recipesSelectors(state);
  return {
    recipes: data.list,
    loading: data.loading,
  };
};

const mapActionsToProps = (dispatch) => ({
  reset: () => resetRecipesAction(dispatch),
  listRecipes: () => listRecipesAction(dispatch),
  removeRecipe: (id) => removeRecipeAction(dispatch, id),

  addFavorite: (id) => addFavoriteAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(RECIPES_LIST_ROUTE)
)(RecipesList);
