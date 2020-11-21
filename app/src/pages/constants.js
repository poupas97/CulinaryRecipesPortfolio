import Home, { HOME_ROUTE } from './Home';
import RecipesList, { RECIPES_LIST_ROUTE } from './RecipesList';

const ROUTES = {
  [HOME_ROUTE]: { page: Home, title: 'Home' },
  [RECIPES_LIST_ROUTE]: { page: RecipesList, title: 'Recipes' },
};

export default ROUTES;
