module.exports = app => {
  const controller = require('../controllers/UserController')();

  app.route('/api/users').get(controller.listUsers);
  app.route('/api/users/create').post(controller.createUser);
  app.route('/api/users/update').put(controller.updateUser);
  app.route('/api/users/delete').delete(controller.deleteUser);
}