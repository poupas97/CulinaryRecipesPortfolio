import { bool, func, object } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Detail from '../../containers/Detail';
import { withPage } from '../../contexts/Page';
import { getRecipeTypesAction, resetRecipeTypesAction } from '../../store/recipeTypes';

export const RECIPE_TYPES_DETAILS_ROUTE = '/recipe-types/:id/details';

const RecipeTypesDetails = ({ recipeType, getRecipeType, match: { params: { id } }, loading, reset }) => {

  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    if (!recipeType) getRecipeType(id);
  }, [recipeType, getRecipeType, id]);

  const labels = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
  ];

  return (
    <Detail
      labels={labels}
      item={recipeType}
      title="Recipe Type Details"
      loading={loading}
    />
  );
};

RecipeTypesDetails.propTypes = {
  recipeType: object,
  getRecipeType: func,
  loading: bool,
  reset: func,
  match: object
};

const mapStateToProps = state => ({
  loading: state.RECIPE_TYPES.loading,
  recipeType: state.RECIPE_TYPES.item,
});

const mapDispatchToProps = dispatch => ({
  reset: () => resetRecipeTypesAction(dispatch),
  getRecipeType: id => getRecipeTypesAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPE_TYPES_DETAILS_ROUTE),
)(RecipeTypesDetails);
