import Home, { HOME_ROUTE } from './Home';
import IngredientsDetails, { INGREDIENTS_DETAILS_ROUTE } from './Ingredient/IngredientsDetails';
import IngredientsList, { INGREDIENTS_LIST_ROUTE } from './Ingredient/IngredientsList';
import RecipesCreate, { RECIPES_CREATE_ROUTE } from './Recipe/RecipesCreate';
import RecipesDetails, { RECIPES_DETAILS_ROUTE } from './Recipe/RecipesDetails';
import RecipesEdit, { RECIPES_EDIT_ROUTE } from './Recipe/RecipesEdit';
import RecipesList, { RECIPES_LIST_ROUTE } from './Recipe/RecipesList';
import RecipeTypesCreate, { RECIPE_TYPES_CREATE_ROUTE } from './RecipeType/RecipeTypesCreate';
import RecipeTypesDetails, { RECIPE_TYPES_DETAILS_ROUTE } from './RecipeType/RecipeTypesDetails';
import RecipeTypesEdit, { RECIPE_TYPES_EDIT_ROUTE } from './RecipeType/RecipeTypesEdit';
import RecipeTypesList, { RECIPE_TYPES_LIST_ROUTE } from './RecipeType/RecipeTypesList';

const ROUTES = {
  HOME: { component: Home, path: HOME_ROUTE, title: 'Home' },
  RECIPES_LIST: { component: RecipesList, path: RECIPES_LIST_ROUTE, title: 'Recipes' },
  RECIPES_DETAILS: { component: RecipesDetails, path: RECIPES_DETAILS_ROUTE },
  RECIPES_CREATE: { component: RecipesCreate, path: RECIPES_CREATE_ROUTE },
  RECIPE_TYPES_LIST: { component: RecipeTypesList, path: RECIPE_TYPES_LIST_ROUTE, title: 'Recipe Types' },
  RECIPE_TYPES_CREATE: { component: RecipeTypesCreate, path: RECIPE_TYPES_CREATE_ROUTE },
  RECIPE_TYPES_DETAILS: { component: RecipeTypesDetails, path: RECIPE_TYPES_DETAILS_ROUTE },
  RECIPE_TYPES_EDIT: { component: RecipeTypesEdit, path: RECIPE_TYPES_EDIT_ROUTE },
  RECIPES_EDIT: { component: RecipesEdit, path: RECIPES_EDIT_ROUTE },
  INGREDIENTS_LIST: { component: IngredientsList, path: INGREDIENTS_LIST_ROUTE, title: 'Ingredients' },
  INGREDIENTS_DETAILS: { component: IngredientsDetails, path: INGREDIENTS_DETAILS_ROUTE },
};

export default ROUTES;
