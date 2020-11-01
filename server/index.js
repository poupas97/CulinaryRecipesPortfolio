/* eslint-disable no-console */
require('dotenv').config();

const app = require('./config/express')();
const port = app.get('port');

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Server at port ${port}`);
});
