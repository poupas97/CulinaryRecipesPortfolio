import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import {
  getIngredientAction,
  ingredientsSelectors,
  resetIngredientsAction,
  saveIngredientAction,
} from '../../store/ingredients';
import { INGREDIENTS_LIST_ROUTE } from './IngredientsList';

export const INGREDIENTS_EDIT_ROUTE = '/ingredients/:id/edit';

const IngredientsEdit = ({
  history,
  getIngredient,
  ingredient,
  updateIngredient,
  saved,
  loading,
}) => {
  const { id } = useParams();

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
      title='Update an Ingredient'
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
};

const mapStateToProps = (state) => {
  const { item, loading, saved } = ingredientsSelectors(state);
  return {
    ingredient: item,
    loading,
    saved,
  };
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => resetIngredientsAction(dispatch),
  getIngredient: (id) => getIngredientAction(dispatch, id),
  updateIngredient: (ingredient) => saveIngredientAction(dispatch, ingredient),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(INGREDIENTS_EDIT_ROUTE)
)(IngredientsEdit);
