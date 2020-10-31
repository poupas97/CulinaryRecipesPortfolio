module.exports = app => {
  const controller = require('../controllers/UserController')();

  app.route('/api/users').get(controller.listUsers);
  app.route('/api/users/:id').get(controller.singleUserById);
  app.route('/api/users').post(controller.createUser);
  app.route('/api/users/:id').put(controller.updateUser);
  app.route('/api/users/:id').delete(controller.deleteUser);
}