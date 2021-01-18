const { select, selectSinge, insert, update, remove } = require('../config/connection');
const { Operators } = require('../config/constants');

const TABLE = 'authors';

const DbKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
};

const ObjectKeys = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  ACTIVE: 'active',
};

const authorToDb = author => {
  const authorToSend = {
    [DbKeys.ID]: author[ObjectKeys.ID],
    [DbKeys.NAME]: author[ObjectKeys.NAME],
    [DbKeys.DESCRIPTION]: author[ObjectKeys.DESCRIPTION],
    [DbKeys.ACTIVE]: author[ObjectKeys.ACTIVE]
  };
  Object.entries(authorToSend).forEach(([key, value]) => {
    if (value === undefined) delete authorToSend[key];
  });
  return authorToSend;
};

const dbToAuthor = (author = {}) => {
  const authorToSend = {
    [ObjectKeys.ID]: author[DbKeys.ID],
    [ObjectKeys.NAME]: author[DbKeys.NAME],
    [ObjectKeys.DESCRIPTION]: author[DbKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: author[DbKeys.ACTIVE]
  };
  Object.entries(authorToSend).forEach(([key, value]) => {
    if (value === undefined) delete authorToSend[key];
  });
  return authorToSend;
};

const listAuthors = async () => {
  const authors = await select(TABLE);
  return authors.map(dbToAuthor);
};

const singleAuthorById = async id => {
  const [author] = await selectSinge(TABLE,
    [{ prop: DbKeys.ID, operator: Operators.EQUAL, value: id }]);

  return dbToAuthor(author);
};

const createAuthor = async author => await insert(TABLE, authorToDb(author));

const updateAuthor = async (author, id) => await update(TABLE, authorToDb(author), id);

const deleteAuthor = async id =>
  await remove(TABLE, [{ prop: DbKeys.ID, operator: Operators.EQUAL, value: id }]);

module.exports = ({ listAuthors, singleAuthorById, createAuthor, updateAuthor, deleteAuthor });
