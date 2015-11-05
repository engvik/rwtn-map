import util from 'util';
import convict from 'convict';
import winston from 'winston';

winston.level = 'debug';

const config = module.exports = convict({
  appname: 'map',
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The server port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
});

config.validate();

winston.debug(config.get('appname') + ':configuration', util.inspect(process.env, {
  colors: true,
}));
