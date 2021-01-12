import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List, { ColumnType } from '../../containers/List';
import { withPage } from '../../contexts/Page';
import { listRecipeTypesAction, resetRecipeTypesAction } from '../../store/recipeTypes';
import { RECIPE_TYPES_CREATE_ROUTE } from './RecipeTypesCreate';
import { RECIPE_TYPES_DETAILS_ROUTE } from './RecipeTypesDetails';

export const RECIPE_TYPES_LIST_ROUTE = '/recipe-types';

const RecipeTypesList = ({ recipeTypes, listRecipeTypes, loading, reset }) => {

  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    if (!recipeTypes) listRecipeTypes();
  }, [recipeTypes, listRecipeTypes]);

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Options', type: ColumnType.CONTEXT, values: [
      { text: 'details', link: RECIPE_TYPES_DETAILS_ROUTE }
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

const mapStateToProps = state => ({
  recipeTypes: state.RECIPE_TYPES.list,
  loading: state.RECIPE_TYPES.loading,
});

const mapActionsToProps = dispatch => ({
  listRecipeTypes: () => listRecipeTypesAction(dispatch),
  reset: () => resetRecipeTypesAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(RECIPE_TYPES_LIST_ROUTE)
)(RecipeTypesList);
