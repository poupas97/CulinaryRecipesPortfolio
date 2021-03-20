const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const cors = require('cors');
const AuthController = require('../api/controllers/AuthController')();

module.exports = () => {
  const app = express();

  // APP VARS
  app.set('port', process.env.PORT);

  // MIDDLEWARES
  app.use(cors());
  app.use(bodyParser.json());
  app.use(AuthController.authenticateToken);

  // ENDPOINTS
  consign({ cwd: 'api' }).then('controllers').then('routes').into(app);

  return app;
};
