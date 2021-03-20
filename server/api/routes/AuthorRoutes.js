module.exports = (app) => {
  const controller = require('../controllers/AuthorController')();

  app.route('/api/authors').get(controller.listAuthors);
  app.route('/api/authors/:id').get(controller.singleAuthorById);
  app.route('/api/authors').post(controller.createAuthor);
  app.route('/api/authors/:id').put(controller.updateAuthor);
  app.route('/api/authors/:id').delete(controller.deleteAuthor);
};
