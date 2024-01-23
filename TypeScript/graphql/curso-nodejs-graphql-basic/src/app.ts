
const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
import useGraphql from'./graphql';
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const createApp = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  require('./utils/auth');

  app.get('/', (req:any, res:any) => {
    res.send('Hola mi server en express');
  });

  app.get('/nueva-ruta', checkApiKey, (req:any, res:any) => {
    res.send('Hola, soy una nueva ruta');
  });

  routerApi(app);
  await useGraphql(app);

  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
  return app;
}

module.exports = createApp;