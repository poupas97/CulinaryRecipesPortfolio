import Home, { HOME_ROUTE } from './Home';
import AuthorsList, { AUTHORS_LIST_ROUTE } from './Author/AuthorsList';
import IngredientsDetails, {
  INGREDIENTS_DETAILS_ROUTE,
} from './Ingredient/IngredientsDetails';
import IngredientsEdit, {
  INGREDIENTS_EDIT_ROUTE,
} from './Ingredient/IngredientsEdit';
import IngredientsList, {
  INGREDIENTS_LIST_ROUTE,
} from './Ingredient/IngredientsList';
import RecipesCreate, { RECIPES_CREATE_ROUTE } from './Recipe/RecipesCreate';
import RecipesDetails, { RECIPES_DETAILS_ROUTE } from './Recipe/RecipesDetails';
import RecipesEdit, { RECIPES_EDIT_ROUTE } from './Recipe/RecipesEdit';
import RecipesList, { RECIPES_LIST_ROUTE } from './Recipe/RecipesList';
import RecipeTypesCreate, {
  RECIPE_TYPES_CREATE_ROUTE,
} from './RecipeType/RecipeTypesCreate';
import RecipeTypesDetails, {
  RECIPE_TYPES_DETAILS_ROUTE,
} from './RecipeType/RecipeTypesDetails';
import RecipeTypesEdit, {
  RECIPE_TYPES_EDIT_ROUTE,
} from './RecipeType/RecipeTypesEdit';
import RecipeTypesList, {
  RECIPE_TYPES_LIST_ROUTE,
} from './RecipeType/RecipeTypesList';
import IngredientsCreate, {
  INGREDIENTS_CREATE_ROUTE,
} from './Ingredient/IngredientsCreate';
import AuthorsDetails, { AUTHORS_DETAILS_ROUTE } from './Author/AuthorsDetails';
import AuthorsEdit, { AUTHORS_EDIT_ROUTE } from './Author/AuthorsEdit';
import AuthorsCreate, { AUTHORS_CREATE_ROUTE } from './Author/AuthorsCreate';
import Favorites, { FAVORITES_LIST_ROUTE } from './Favorites';

const ROUTES = {
  HOME: { component: Home, path: HOME_ROUTE, title: 'Home' },
  RECIPES_LIST: {
    component: RecipesList,
    path: RECIPES_LIST_ROUTE,
    title: 'Recipes',
  },
  RECIPES_DETAILS: { component: RecipesDetails, path: RECIPES_DETAILS_ROUTE },
  RECIPES_CREATE: { component: RecipesCreate, path: RECIPES_CREATE_ROUTE },
  RECIPE_TYPES_LIST: {
    component: RecipeTypesList,
    path: RECIPE_TYPES_LIST_ROUTE,
    title: 'Recipe Types',
  },
  RECIPE_TYPES_CREATE: {
    component: RecipeTypesCreate,
    path: RECIPE_TYPES_CREATE_ROUTE,
  },
  RECIPE_TYPES_DETAILS: {
    component: RecipeTypesDetails,
    path: RECIPE_TYPES_DETAILS_ROUTE,
  },
  RECIPE_TYPES_EDIT: {
    component: RecipeTypesEdit,
    path: RECIPE_TYPES_EDIT_ROUTE,
  },
  RECIPES_EDIT: { component: RecipesEdit, path: RECIPES_EDIT_ROUTE },
  INGREDIENTS_LIST: {
    component: IngredientsList,
    path: INGREDIENTS_LIST_ROUTE,
    title: 'Ingredients',
  },
  INGREDIENTS_DETAILS: {
    component: IngredientsDetails,
    path: INGREDIENTS_DETAILS_ROUTE,
  },
  INGREDIENTS_EDIT: {
    component: IngredientsEdit,
    path: INGREDIENTS_EDIT_ROUTE,
  },
  INGREDIENTS_CREATE: {
    component: IngredientsCreate,
    path: INGREDIENTS_CREATE_ROUTE,
  },
  AUTHORS_LIST: {
    component: AuthorsList,
    path: AUTHORS_LIST_ROUTE,
    title: 'Authors',
  },
  AUTHORS_DETAILS: { component: AuthorsDetails, path: AUTHORS_DETAILS_ROUTE },
  AUTHORS_EDIT: { component: AuthorsEdit, path: AUTHORS_EDIT_ROUTE },
  AUTHORS_CREATE: { component: AuthorsCreate, path: AUTHORS_CREATE_ROUTE },
  FAVORITES_LIST: {
    component: Favorites,
    path: FAVORITES_LIST_ROUTE,
    title: 'Favorites',
  },
};

export default ROUTES;
