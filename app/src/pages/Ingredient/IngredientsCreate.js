import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { resetIngredientsAction, saveIngredientAction } from '../../store/ingredients';
import { INGREDIENTS_LIST_ROUTE } from './IngredientsList';

export const INGREDIENTS_CREATE_ROUTE = '/ingredients/create';

const IngredientsCreate = ({ history, createIngredient, saved, error, loading }) => {

  const goBack = useCallback(() => {
    history.push(INGREDIENTS_LIST_ROUTE);
  }, [history]);

  useEffect(() => {
    if (saved) goBack();
  }, [saved, goBack]);

  const inputs = [
    { text: 'Name', value: 'name', type: FormInputType.TEXT },
    { text: 'Description', value: 'description', type: FormInputType.TEXT },
  ];

  return (
    <Form
      inputs={inputs}
      onSubmit={createIngredient}
      title="Create an Ingredient"
      onCancel={goBack}
      error={error}
      loading={loading}
    />
  );
};

IngredientsCreate.propTypes = {
  history: object, // eslint-disable-line key-spacing
  createIngredient: func,
  saved: bool,
  error: bool,
  loading: bool,
};

const mapStateToProps = state => ({
  loading: state.INGREDIENTS.loading,
  saved: state.INGREDIENTS.saved,
});

const mapDispatchToProps = dispatch => ({
  reset: () => resetIngredientsAction(dispatch),
  createIngredient: ingredient => saveIngredientAction(dispatch, ingredient),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(INGREDIENTS_CREATE_ROUTE),
)(IngredientsCreate);
