module.exports = app => {
  const controller = require('../controllers/AuthController')();

  app.route('/api/login').post(controller.login);
}