const TypeConnection = require('../../connections/TypeConnection');
const { ErrorMapper, errorDtoSimple } = require('../../dto/ErrorDTO');

const listTypes = async (req, res) => {
  try {
    const result = await TypeConnection.listTypes();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const singleTypeById = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await TypeConnection.singleTypeById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const createType = async (req, res) => {
  try {
    const { body: { name, description } } = req;
    const result = await TypeConnection.createType({ name, description });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const updateType = async (req, res) => {
  try {
    const { body: { name, description, active }, params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await TypeConnection.updateType({ name, description, active }, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const deleteType = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await TypeConnection.deleteType(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ listTypes, singleTypeById, createType, updateType,
  deleteType });
