const IngredientConnection = require('../../connections/IngredientConnection');
const { ErrorMapper, errorDtoSimple } = require('../../dto/ErrorDTO');

const listIngredients = async (req, res) => {
  try {
    const result = await IngredientConnection.listIngredients();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const singleIngredientById = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await IngredientConnection.singleIngredientById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const createIngredient = async (req, res) => {
  try {
    const { body: { name, description } } = req;
    const result = await IngredientConnection.createIngredient({ name, description });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const updateIngredient = async (req, res) => {
  try {
    const { body: { name, description, active }, params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await IngredientConnection.updateIngredient({ name, description, active }, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const deleteIngredient = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await IngredientConnection.deleteIngredient(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ listIngredients, singleIngredientById, createIngredient, updateIngredient,
  deleteIngredient });
