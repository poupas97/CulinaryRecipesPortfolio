const RecipeTypesConnection = require('../../connections/RecipeTypesConnection');
const { ErrorMapper, errorDtoSimple } = require('../../dto/ErrorDTO');

const listRecipeTypes = async (req, res) => {
  try {
    const result = await RecipeTypesConnection.listRecipeTypes();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const singleRecipeTypeById = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await RecipeTypesConnection.singleRecipeTypeById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const createRecipeType = async (req, res) => {
  try {
    const { body: { name, description } } = req;
    const result = await RecipeTypesConnection.createRecipeType({ name, description });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const updateRecipeType = async (req, res) => {
  try {
    const { body: { name, description, active }, params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await RecipeTypesConnection.updateRecipeType({ name, description, active }, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const deleteRecipeType = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await RecipeTypesConnection.deleteRecipeType(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ listRecipeTypes, singleRecipeTypeById, createRecipeType, updateRecipeType,
  deleteRecipeType });
