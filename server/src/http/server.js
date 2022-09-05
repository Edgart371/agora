const express = require('express');
const bodyParser = require('body-parser');

const logMiddleware = require('./middlewares/logMiddlesware');
const corsMiddleware = require('./middlewares/corsMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const api = require('./routes/api');

module.exports = async () => {
  const app = express();

  app.use(bodyParser.json());

  app.use(corsMiddleware());
  app.use(logMiddleware());

  app.use('/api', api());

  // must be place right before final return
  app.use(errorMiddleware());

  return app;
};
