import winston from 'winston';
import config from './config';
import setup from './setup';

const app = setup.createExpressApp(config);

setup.createRoutes(app);
setup.handleExpressErrors(app, config);

app.listen(app.get('port'), () => {
  winston.debug(config.get('appname'), 'Node express server listening on: ' + app.get('port'));
});
