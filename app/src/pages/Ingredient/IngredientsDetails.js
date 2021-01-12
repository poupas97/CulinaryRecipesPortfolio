import { bool, func, object } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Detail from '../../containers/Detail';
import { withPage } from '../../contexts/Page';
import { getIngredientAction, resetIngredientsAction } from '../../store/ingredients';

export const INGREDIENTS_DETAILS_ROUTE = '/ingredients/:id/details';

const IngredientsDetails = ({ ingredient, getIngredient, match: { params: { id } }, loading, reset }) => {

  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    if (!ingredient) getIngredient(id);
  }, [ingredient, getIngredient, id]);

  const labels = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
  ];

  return (
    <Detail
      labels={labels}
      item={ingredient}
      title="Ingredient Details"
      loading={loading}
    />
  );
};

IngredientsDetails.propTypes = {
  ingredient: object,
  getIngredient: func,
  loading: bool,
  reset: func,
  match: object
};

const mapStateToProps = state => ({
  loading: state.INGREDIENTS.loading,
  ingredient: state.INGREDIENTS.item,
});

const mapDispatchToProps = dispatch => ({
  reset: () => resetIngredientsAction(dispatch),
  getIngredient: id => getIngredientAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(INGREDIENTS_DETAILS_ROUTE),
)(IngredientsDetails);
