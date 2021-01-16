const RecipeConnection = require('../../connections/RecipeConnection');
const RecipeIngredientConnection = require('../../connections/RecipeIngredientConnection');
const { ErrorMapper, errorDtoSimple } = require('../../dto/ErrorDTO');

const listRecipes = async (req, res) => {
  try {
    const result = await RecipeConnection.listRecipes();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const singleRecipeById = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await RecipeConnection.singleRecipeById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const createRecipe = async (req, res) => {
  try {
    const { body, userAuthenticated: { id: idUser } } = req;

    const newRecipe = { ...body };

    const idRecipeType = newRecipe.recipeType.id;
    delete newRecipe.recipeType;

    const idAuthor = newRecipe.author.id;
    delete newRecipe.author;

    const result = await RecipeConnection.createRecipe({ ...newRecipe, idRecipeType, idAuthor, idUser });

    // FIXME:
    // const resultNewRelations = 
    await RecipeIngredientConnection.createRecipeIngredient(
      newRecipe.ingredients.map(it => ({ id_recipe: result.id, id_ingredient: it.id })));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { body, params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const oldRecipe = await RecipeConnection.singleRecipeById(id);
    const newRecipe = { ...body };

    if (oldRecipe.idAuthor != newRecipe.author.id) {
      newRecipe.idAuthor = newRecipe.author.id;
      delete newRecipe.author;
    }

    if (oldRecipe.idRecipeType != newRecipe.recipeType.id) {
      newRecipe.idRecipeType = newRecipe.recipeType.id;
      delete newRecipe.recipeType;
    }

    // TODO: ingredientsList
    const ingredientsRelation = await RecipeIngredientConnection.listIngredientsByRecipe(id, true);
    const newIngredients = newRecipe.ingredients || [];

    const relationsToDelete = ingredientsRelation.filter(relation =>
      !newIngredients.find(newIngredient => newIngredient.id === relation.id_ingredient));
    // const resultDeleteRelations = 
    await RecipeIngredientConnection.deleteRecipeIngredient(
      relationsToDelete.map(it => it.id));

    const relationsToCreate = newIngredients.filter(newIngredient =>
      !ingredientsRelation.find(relation => newIngredient.id === relation.id_ingredient));
    // const resultNewRelations = 
    await RecipeIngredientConnection.createRecipeIngredient(
      relationsToCreate.map(it => ({ id_recipe: id, id_ingredient: it.id })));

    const result = await RecipeConnection.updateRecipe(newRecipe, id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await RecipeConnection.deleteRecipe(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ listRecipes, singleRecipeById, createRecipe, updateRecipe, deleteRecipe });
