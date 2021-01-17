const FavoriteConnection = require('../../connections/FavoriteConnection');
const { ErrorMapper, errorDtoSimple } = require('../../dto/ErrorDTO');

const listFavorites = async (req, res) => {
  try {
    const result = await FavoriteConnection.listFavorites();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const singleFavoriteById = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await FavoriteConnection.singleFavoriteById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const createFavorite = async (req, res) => {
  try {
    const { body: { name, description } } = req;
    const result = await FavoriteConnection.createFavorite({ name, description });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const updateFavorite = async (req, res) => {
  try {
    const { body: { name, description, active }, params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await FavoriteConnection.updateFavorite({ name, description, active }, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await FavoriteConnection.deleteFavorite(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ listFavorites, singleFavoriteById, createFavorite, updateFavorite,
  deleteFavorite });
