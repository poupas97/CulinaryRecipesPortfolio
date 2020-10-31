module.exports = app => {
  const controller = require('../controllers/AuthController')();

  app.route('/api/login').post(controller.login);
  app.route('/api/refresh').post(controller.refresh);
  app.route('/api/logout').post(controller.logout);
}