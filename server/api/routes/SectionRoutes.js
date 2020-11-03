module.exports = app => {
  const controller = require('../controllers/SectionController')();

  app.route('/api/sections').get(controller.listSections);
  app.route('/api/sections/:id').get(controller.singleSectionById);
  app.route('/api/sections').post(controller.createSection);
  app.route('/api/sections/:id').put(controller.updateSection);
  app.route('/api/sections/:id').delete(controller.deleteSection);
};
