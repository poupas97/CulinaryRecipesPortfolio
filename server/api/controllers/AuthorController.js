const AuthorConnection = require('../../connections/AuthorConnection');
const { ErrorMapper, errorDtoSimple } = require('../../dto/ErrorDTO');

const listAuthors = async (req, res) => {
  try {
    const result = await AuthorConnection.listAuthors();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const singleAuthorById = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await AuthorConnection.singleAuthorById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const createAuthor = async (req, res) => {
  try {
    const { body: { name, description } } = req;
    const result = await AuthorConnection.createAuthor({ name, description });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { body: { name, description, active }, params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await AuthorConnection.updateAuthor({ name, description, active }, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { params: { id } } = req;

    if (!id) return res.status(500).json(errorDtoSimple(ErrorMapper.MISS_ID));

    const result = await AuthorConnection.deleteAuthor(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(errorDtoSimple(error));
  }
};

module.exports = () => ({ listAuthors, singleAuthorById, createAuthor, updateAuthor,
  deleteAuthor });
