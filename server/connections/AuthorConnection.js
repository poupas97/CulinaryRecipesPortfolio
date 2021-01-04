const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'authors';

const KEY_BD_ID = 'id';
const KEY_BD_NAME = 'name';
const KEY_BD_DESCRIPTION = 'description';
const KEY_BD_ACTIVE = 'active';

const KEY_ID = 'id';
const KEY_NAME = 'name';
const KEY_DESCRIPTION = 'description';
const KEY_ACTIVE = 'active';

const authorToBd = author => {
  const authorToSend = {
    [KEY_BD_ID]: author[KEY_ID],
    [KEY_BD_NAME]: author[KEY_NAME],
    [KEY_BD_DESCRIPTION]: author[KEY_DESCRIPTION],
    [KEY_BD_ACTIVE]: author[KEY_ACTIVE]
  };
  Object.entries(authorToSend).forEach(([key, value]) => {
    if (value === undefined) delete authorToSend[key];
  });
  return authorToSend;
};

const bdToAuthor = (author = {}) => {
  const authorToSend = {
    [KEY_ID]: author[KEY_BD_ID],
    [KEY_NAME]: author[KEY_BD_NAME],
    [KEY_DESCRIPTION]: author[KEY_BD_DESCRIPTION],
    [KEY_ACTIVE]: author[KEY_BD_ACTIVE]
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
  const [author] = await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
  return bdToAuthor(author);
};

const createAuthor = async author => await insert(TABLE, authorToBd(author));

const updateAuthor = async (author, id) => await update(TABLE, authorToBd(author), id);

const deleteAuthor = async id => await remove(TABLE, id);

module.exports = ({ listAuthors, singleAuthorById, createAuthor, updateAuthor, deleteAuthor });
