const { select, selectSinge, insert, update, remove } = require('../config/connection');

const TABLE = 'sections';

const listSections = async () => await select(TABLE);

const singleSectionById = async id => {
  const [section] = await selectSinge(TABLE, [{ prop: 'id', operator: '=', value: id } ]);
  return section;
};

const createSection = async section => await insert(TABLE, section);

const updateSection = async (section, id) => await update(TABLE, section, id);

const deleteSection = async id => await remove(TABLE, id);

module.exports = ({ listSections, singleSectionById, createSection, updateSection, deleteSection });
