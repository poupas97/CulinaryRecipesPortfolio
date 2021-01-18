import { bool, func, object } from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

import Form, { FormInputType } from '../../containers/Form';
import { withPage } from '../../contexts/Page';
import { getRecipeTypesAction, recipeTypesSelectors, resetRecipeTypesAction, saveRecipeTypeAction } from '../../store/recipeTypes';
import { RECIPE_TYPES_LIST_ROUTE } from './RecipeTypesList';

export const RECIPE_TYPES_EDIT_ROUTE = '/recipe-types/:id/edit';

const RecipeTypesEdit = ({
  history, getRecipeType, recipeType, updateRecipeType, saved, loading,
}) => {
  const { id } = useParams();

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
      title="Update a Recipe Type"
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
};

const mapStateToProps = state => {
  const { item, loading, saved } = recipeTypesSelectors(state);
  return ({
    recipeType: item,
    loading,
    saved,
  });
};

const mapDispatchToProps = dispatch => ({
  reset: () => resetRecipeTypesAction(dispatch),
  getRecipeType: id => getRecipeTypesAction(dispatch, id),
  updateRecipeType: recipeType => saveRecipeTypeAction(dispatch, recipeType),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPE_TYPES_EDIT_ROUTE)
)(RecipeTypesEdit);
