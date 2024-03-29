import { bool, func, object } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Detail from '../../containers/Detail';
import { withPage } from '../../contexts/Page';
import {
  getRecipeAction,
  recipesSelectors,
  resetRecipesAction,
} from '../../store/recipes';

export const RECIPES_DETAILS_ROUTE = '/recipes/:id/details';

const RecipesDetails = ({
  recipe,
  getRecipe,
  match: {
    params: { id },
  },
  loading,
  reset,
}) => {
  useEffect(() => () => reset(), [reset]);

  useEffect(() => {
    if (!recipe) getRecipe(id);
  }, [recipe, getRecipe, id]);

  const labels = [
    { text: 'Name', value: 'name' },
    { text: 'Description', value: 'description' },
    { text: 'Author', value: 'author.name' },
    { text: 'Recipe Type', value: 'recipeType.name' },
    {
      text: 'Ingredients',
      list: 'ingredients',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
      ],
    },
  ];

  return (
    <Detail
      labels={labels}
      item={recipe}
      title='Recipe Details'
      loading={loading}
    />
  );
};

RecipesDetails.propTypes = {
  recipe: object,
  getRecipe: func,
  loading: bool,
  reset: func,
  match: object,
};

const mapStateToProps = (state) => {
  const { item, loading } = recipesSelectors(state);
  return {
    recipe: item,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => resetRecipesAction(dispatch),
  getRecipe: (id) => getRecipeAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPage(RECIPES_DETAILS_ROUTE)
)(RecipesDetails);
