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
    const { body: { name, description, active/*, ingredientsList */ }, params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    // TODO: ingredientsList
    // const currentIngredientsList = await RecipeIngredientConnection.listIngredientsByRecipe(id);

    // const relationsToDelete = currentIngredientsList.filter(currentIngredient =>
    //   !ingredientsList.find(receivedIngredient => receivedIngredient.id === currentIngredient.id_ingredient));

    // const resultDeleteRelations = 
    // await RecipeIngredientConnection.deleteRecipeIngredient(
    //   relationsToDelete.map(it => it.id));

    // const relationsToCreate = ingredientsList.filter(receivedIngredient =>
    //   !currentIngredientsList.find(currentIngredient =>
    //     currentIngredient.id_ingredient === receivedIngredient.id));

    // const resultNewRelations = 
    // await RecipeIngredientConnection.createRecipeIngredient(
    //   relationsToCreate.map(it => ({ id_recipe: id, id_ingredient: it.id })));

    const result = await RecipeConnection.updateRecipe({ name, description, active }, id);

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
