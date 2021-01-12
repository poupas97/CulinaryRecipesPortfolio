import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List, { ColumnType } from '../../containers/List';
import { withPage } from '../../contexts/Page';
import { listIngredientsAction, resetIngredientsAction } from '../../store/ingredients';
import { INGREDIENTS_DETAILS_ROUTE } from './IngredientsDetails';

export const INGREDIENTS_LIST_ROUTE = '/ingredients';

const IngredientsList = ({ ingredients, listIngredients, loading, reset }) => {

  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    if (!ingredients) listIngredients();
  }, [ingredients, listIngredients]);

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Options', type: ColumnType.CONTEXT, values: [
      { text: 'details', link: INGREDIENTS_DETAILS_ROUTE },
      // { text: 'edit', link: RECIPES_EDIT_ROUTE },
    ] },
  ];

  return (
    <List
      headers={headers}
      rows={ingredients}
      loading={loading}
      // canAdd={RECIPES_CREATE_ROUTE}
    />
  );
};

IngredientsList.propTypes = {
  ingredients: array,
  listIngredients: func,
  loading: bool,
  reset: func,
};

const mapStateToProps = state => ({
  ingredients: state.INGREDIENTS.list,
  loading: state.INGREDIENTS.loading,
});

const mapActionsToProps = dispatch => ({
  listIngredients: () => listIngredientsAction(dispatch),
  reset: () => resetIngredientsAction(dispatch),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(INGREDIENTS_LIST_ROUTE)
)(IngredientsList);
