const mongoose = require('mongoose');
const logger = require('./logger');
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/agora';

module.exports.connectToMongo = () => {
  return new Promise((resolve, reject) => {
    logger.info(`MongoDB: Connection to ${MONGO_URI}`);

    // Set up default mongoose connection
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise; // Get the default connection
    const db = mongoose.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on('error', (e) => {
      logger.error.bind(logger, 'MongoDB: connection error:');
      reject(e);
    });

    db.once('open', () => {
      logger.info('MongoDB: Connected');
      resolve({ db });
    });
  });
};

module.exports.closeMongoConnection = (mongooseInst = mongoose) => mongooseInst.disconnect();
