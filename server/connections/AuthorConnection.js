const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'authors';

const BdKeys = {
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

const authorToBd = author => {
  const authorToSend = {
    [BdKeys.ID]: author[ObjectKeys.ID],
    [BdKeys.NAME]: author[ObjectKeys.NAME],
    [BdKeys.DESCRIPTION]: author[ObjectKeys.DESCRIPTION],
    [BdKeys.ACTIVE]: author[ObjectKeys.ACTIVE]
  };
  Object.entries(authorToSend).forEach(([key, value]) => {
    if (value === undefined) delete authorToSend[key];
  });
  return authorToSend;
};

const bdToAuthor = (author = {}) => {
  const authorToSend = {
    [ObjectKeys.ID]: author[BdKeys.ID],
    [ObjectKeys.NAME]: author[BdKeys.NAME],
    [ObjectKeys.DESCRIPTION]: author[BdKeys.DESCRIPTION],
    [ObjectKeys.ACTIVE]: author[BdKeys.ACTIVE]
  };
  Object.entries(authorToSend).forEach(([key, value]) => {
    if (value === undefined) delete authorToSend[key];
  });
  return authorToSend;
};

const listAuthors = async () => {
  const authors = await select(TABLE);
  return authors.map(bdToAuthor);
};

const singleAuthorById = async id => {
  const [author] = await selectSinge(TABLE, [{ prop: BdKeys.ID, operator: '=', value: id } ]);
  return bdToAuthor(author);
};

const createAuthor = async author => await insert(TABLE, authorToBd(author));

const updateAuthor = async (author, id) => await update(TABLE, authorToBd(author), id);

const deleteAuthor = async id => await remove(TABLE, id);

module.exports = ({ listAuthors, singleAuthorById, createAuthor, updateAuthor, deleteAuthor });
