import { bool, func, object } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

import Detail from '../../containers/Detail';
import { withPage } from '../../contexts/Page';
import { getIngredientAction, ingredientsSelectors, resetIngredientsAction } from '../../store/ingredients';

export const INGREDIENTS_DETAILS_ROUTE = '/ingredients/:id/details';

const IngredientsDetails = ({ ingredient, getIngredient, loading, reset }) => {
  const { id } = useParams();

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
};

const mapStateToProps = state => {
  const { item, loading } = ingredientsSelectors(state);
  return ({
    ingredient: item,
    loading,
  });
};

const mapDispatchToProps = dispatch => ({
  reset: () => resetIngredientsAction(dispatch),
  getIngredient: id => getIngredientAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(INGREDIENTS_DETAILS_ROUTE),
)(IngredientsDetails);
