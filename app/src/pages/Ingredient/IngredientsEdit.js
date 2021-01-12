import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { getIngredientAction, resetIngredientsAction, saveIngredientAction, } from '../../store/ingredients';
import { INGREDIENTS_LIST_ROUTE } from './IngredientsList';

export const INGREDIENTS_EDIT_ROUTE = '/ingredients/:id/edit';

const IngredientsEdit = ({
  history, getIngredient, ingredient, updateIngredient, saved, loading, match: { params: { id } } }) => {

  useEffect(() => {
    if (!ingredient) getIngredient(id);
  }, [ingredient, getIngredient, id]);

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
      data={ingredient}
      inputs={inputs}
      onSubmit={updateIngredient}
      title="Update an Ingredient"
      onCancel={goBack}
      loading={loading}
    />
  );
};

IngredientsEdit.propTypes = {
  history: object, // eslint-disable-line key-spacing
  getIngredient: func,
  reset: func,
  ingredient: object, // eslint-disable-line key-spacing
  updateIngredient: func,
  saved: bool,
  loading: bool,
  match: object, // eslint-disable-line key-spacing
};

const mapStateToProps = state => ({
  loading: state.INGREDIENTS.loading,
  ingredient: state.INGREDIENTS.item,
  saved: state.INGREDIENTS.saved,
});

const mapDispatchToProps = dispatch => ({
  reset: () => resetIngredientsAction(dispatch),
  getIngredient: id => getIngredientAction(dispatch, id),
  updateIngredient: ingredient => saveIngredientAction(dispatch, ingredient),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(INGREDIENTS_EDIT_ROUTE)
)(IngredientsEdit);
