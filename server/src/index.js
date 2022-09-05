const server = require('./http/server');
const logger = require('./common/logger');
const mongodb = require('./common/mongodb');

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = 3001;

process.on('unhandledRejection', (e) => logger.error('An unexpected error occurred', e));
process.on('uncaughtException', (e) => logger.error('An unexpected error occurred', e));

(async function () {
  await mongodb.connectToMongo();
  const http = await server();
  http.listen(PORT, () => logger.info(`AGORA - Server ready and listening on port ${PORT}`));
})();
