import Home, { HOME_ROUTE } from './Home';
import RecipesCreate, { RECIPES_CREATE_ROUTE } from './RecipesCreate';
import RecipesDetails, { RECIPES_DETAILS_ROUTE } from './RecipesDetails';
import RecipesList, { RECIPES_LIST_ROUTE } from './RecipesList';

const ROUTES = {
  HOME: { component: Home, path: HOME_ROUTE, title: 'Home' },
  RECIPES_LIST: { component: RecipesList, path: RECIPES_LIST_ROUTE, title: 'Recipes' },
  RECIPES_DETAILS: { component: RecipesDetails, path: RECIPES_DETAILS_ROUTE },
  RECIPES_CREATE: { component: RecipesCreate, path: RECIPES_CREATE_ROUTE },
};

export default ROUTES;
