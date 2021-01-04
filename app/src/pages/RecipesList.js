import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List, { ColumnType } from '../containers/List';
import { withPage } from '../contexts/Page';
import { getRecipesAction, resetRecipesAction } from '../store/recipes';
import { RECIPES_DETAILS_ROUTE } from './RecipesDetails';

export const RECIPES_LIST_ROUTE = '/recipes';

const RecipesList = ({ recipes, getRecipes, loading, reset }) => {

  useEffect(() => () => reset(), [reset]);
  console.log(recipes);
  useEffect(() => {
    if (!recipes) getRecipes();
  }, [recipes, getRecipes]);

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Options', type: ColumnType.CONTEXT, values: [{ text: 'details', link: RECIPES_DETAILS_ROUTE }] },
  ];

  return (
    <List
      headers={headers}
      rows={recipes}
      loading={loading}
    />
  );
};

RecipesList.propTypes = {
  recipes: array,
  getRecipes: func,
  loading: bool,
  reset: func,
};

const mapStateToProps = state => ({
  recipes: state.RECIPES.list,
  loading: state.RECIPES.loading,
});

const mapActionsToProps = dispatch => ({
  getRecipes: () => getRecipesAction(dispatch),
  reset: () => resetRecipesAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(RECIPES_LIST_ROUTE)
)(RecipesList);
