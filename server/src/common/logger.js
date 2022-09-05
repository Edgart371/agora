const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

const createStreams = () => {
  const type = process.env.LOG_TYPE ?? 'console';
  const level = process.env.LOG_LEVEL ?? 'info';

  const jsonStream = () => {
    return {
      name: 'json',
      level,
      stream: process.stdout,
    };
  };

  const consoleStream = () => {
    const pretty = new PrettyStream();
    pretty.pipe(process.stdout);
    return {
      name: 'console',
      level,
      stream: pretty,
    };
  };

  const streams = [type === 'console' ? consoleStream() : jsonStream()];
  return streams;
};

module.exports = bunyan.createLogger({
  name: 'agora',
  serializers: bunyan.stdSerializers,
  streams: createStreams(),
});
