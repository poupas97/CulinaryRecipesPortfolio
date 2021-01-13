import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List, { ColumnType } from '../../containers/List';
import { withPage } from '../../contexts/Page';
import { listRecipeTypesAction, recipeTypesSelectors, resetRecipeTypesAction } from '../../store/recipeTypes';
import { RECIPE_TYPES_CREATE_ROUTE } from './RecipeTypesCreate';
import { RECIPE_TYPES_DETAILS_ROUTE } from './RecipeTypesDetails';
import { RECIPE_TYPES_EDIT_ROUTE } from './RecipeTypesEdit';

export const RECIPE_TYPES_LIST_ROUTE = '/recipe-types';

const RecipeTypesList = ({ recipeTypes, listRecipeTypes, loading, reset }) => {

  useEffect(() => {
    reset();
    return () => reset();
  }, []);

  useEffect(() => {
    if (!recipeTypes) listRecipeTypes();
  }, [recipeTypes, listRecipeTypes]);

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Options', type: ColumnType.CONTEXT, values: [
      { text: 'details', link: RECIPE_TYPES_DETAILS_ROUTE },
      { text: 'edit', link: RECIPE_TYPES_EDIT_ROUTE },
    ] },
  ];

  return (
    <List
      headers={headers}
      rows={recipeTypes}
      loading={loading}
      canAdd={RECIPE_TYPES_CREATE_ROUTE}
    />
  );
};

RecipeTypesList.propTypes = {
  recipeTypes: array,
  listRecipeTypes: func,
  loading: bool,
  reset: func,
};

const mapStateToProps = state => {
  const data = recipeTypesSelectors(state);
  return ({
    recipeTypes: data.list,
    loading: data.loading,
  });
};

const mapActionsToProps = dispatch => ({
  listRecipeTypes: () => listRecipeTypesAction(dispatch),
  reset: () => resetRecipeTypesAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(RECIPE_TYPES_LIST_ROUTE)
)(RecipeTypesList);
