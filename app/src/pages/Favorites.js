import { array, bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import List from '../containers/List';
import { ColumnType } from '../containers/Section';
import { withPage } from '../contexts/Page';
import {
  favoritesSelectors,
  listFavoritesAction,
  removeFavoriteAction,
  resetFavoritesAction,
} from '../store/favorites';
import { RECIPES_DETAILS_ROUTE } from './Recipe/RecipesDetails';

export const FAVORITES_LIST_ROUTE = '/favorites';

const Favorites = ({
  favorites,
  listFavorites,
  loading,
  reset,
  removeFavorite,
}) => {
  useEffect(() => {
    reset();
    return () => reset();
  }, []);

  useEffect(() => {
    if (!favorites) listFavorites();
  }, [favorites, listFavorites]);

  const headers = [
    { text: 'Name', value: 'recipe.name' },
    { text: 'Description', value: 'recipe.description' },
    {
      text: 'Options',
      type: ColumnType.CONTEXT,
      values: [
        {
          text: 'details',
          link: RECIPES_DETAILS_ROUTE.replace(':id', ':recipe.id'),
        },
        { text: 'remove', action: removeFavorite },
      ],
    },
  ];

  return <List headers={headers} rows={favorites} loading={loading} />;
};

Favorites.propTypes = {
  favorites: array,
  listFavorites: func,
  loading: bool,
  reset: func,
  removeFavorite: func,
};

const mapStateToProps = (state) => {
  const data = favoritesSelectors(state);
  return {
    favorites: data.list,
    loading: data.loading,
  };
};

const mapActionsToProps = (dispatch) => ({
  reset: () => resetFavoritesAction(dispatch),
  listFavorites: () => listFavoritesAction(dispatch),
  removeFavorite: (id) => removeFavoriteAction(dispatch, id),
});

export default compose(
  connect(mapStateToProps, mapActionsToProps),
  withPage(FAVORITES_LIST_ROUTE)
)(Favorites);
