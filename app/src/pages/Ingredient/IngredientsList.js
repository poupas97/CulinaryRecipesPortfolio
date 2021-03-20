import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List, { ColumnType } from '../../containers/List';
import { withPage } from '../../contexts/Page';
import {
  ingredientsSelectors,
  listIngredientsAction,
  removeIngredientAction,
  resetIngredientsAction,
} from '../../store/ingredients';
import { INGREDIENTS_CREATE_ROUTE } from './IngredientsCreate';
import { INGREDIENTS_DETAILS_ROUTE } from './IngredientsDetails';
import { INGREDIENTS_EDIT_ROUTE } from './IngredientsEdit';

export const INGREDIENTS_LIST_ROUTE = '/ingredients';

const IngredientsList = ({
  ingredients,
  listIngredients,
  loading,
  reset,
  removeIngredient,
}) => {
  useEffect(() => {
    reset();
    return () => reset();
  }, []);

  useEffect(() => {
    if (!ingredients) listIngredients();
  }, [ingredients, listIngredients]);

  const headers = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    {
      text: 'Options',
      type: ColumnType.CONTEXT,
      values: [
        { text: 'details', link: INGREDIENTS_DETAILS_ROUTE },
        { text: 'edit', link: INGREDIENTS_EDIT_ROUTE },
        { text: 'remove', action: removeIngredient },
      ],
    },
  ];

  return (
    <List
      headers={headers}
      rows={ingredients}
      loading={loading}
      canAdd={INGREDIENTS_CREATE_ROUTE}
    />
  );
};

IngredientsList.propTypes = {
  ingredients: array,
  listIngredients: func,
  loading: bool,
  reset: func,
  removeIngredient: func,
};

const mapStateToProps = (state) => {
  const data = ingredientsSelectors(state);
  return {
    ingredients: data.list,
    loading: data.loading,
  };
};

const mapActionsToProps = (dispatch) => ({
  reset: () => resetIngredientsAction(dispatch),
  listIngredients: () => listIngredientsAction(dispatch),
  removeIngredient: (id) => removeIngredientAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(INGREDIENTS_LIST_ROUTE)
)(IngredientsList);
