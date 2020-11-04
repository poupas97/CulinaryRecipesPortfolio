module.exports = app => {
  const controller = require('../controllers/TypeController')();

  app.route('/api/types').get(controller.listTypes);
  app.route('/api/types/:id').get(controller.singleTypeById);
  app.route('/api/types').post(controller.createType);
  app.route('/api/types/:id').put(controller.updateType);
  app.route('/api/types/:id').delete(controller.deleteType);
};
