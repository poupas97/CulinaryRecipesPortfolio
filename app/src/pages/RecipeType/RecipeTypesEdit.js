import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { getRecipeTypesAction, resetRecipeTypesAction, saveRecipeTypeAction } from '../../store/recipeTypes';
import { RECIPE_TYPES_LIST_ROUTE } from './RecipeTypesList';

export const RECIPE_TYPES_EDIT_ROUTE = '/sensors/:id/edit';

const RecipeTypesEdit = ({
  history, getRecipeType, recipeType, updateRecipeType, saved, loading, match: { params: { id } } }) => {

  useEffect(() => {
    if (!recipeType) getRecipeType(id);
  }, [recipeType, getRecipeType, id]);

  const goBack = useCallback(() => {
    history.push(RECIPE_TYPES_LIST_ROUTE);
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
      data={recipeType}
      inputs={inputs}
      onSubmit={updateRecipeType}
      title="Update a Sensor"
      onCancel={goBack}
      loading={loading}
    />
  );
};

RecipeTypesEdit.propTypes = {
  history: object, // eslint-disable-line key-spacing
  getRecipeType: func,
  reset: func,
  recipeType: object, // eslint-disable-line key-spacing
  updateRecipeType: func,
  saved: bool,
  loading: bool,
  match: object, // eslint-disable-line key-spacing
};

const mapStateToProps = state => ({
  loading: state.RECIPE_TYPES.loading,
  recipeType: state.RECIPE_TYPES.item,
  saved: state.RECIPE_TYPES.saved,
});

const mapDispatchToProps = dispatch => ({
  reset: () => resetRecipeTypesAction(dispatch),
  getRecipeType: id => getRecipeTypesAction(dispatch, id),
  updateRecipeType: recipeType => saveRecipeTypeAction(dispatch, recipeType),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPE_TYPES_EDIT_ROUTE)
)(RecipeTypesEdit);
