module.exports = app => {
  const controller = require('../controllers/UserController')();

  app.route('/api/v1/users').get(controller.list);
}