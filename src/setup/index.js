import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import winston from 'winston';

module.exports.createExpressApp = (config) => {
  const app = express();

  app.set('port', config.get('port'));

  app.use((req, res, next) => {
    winston.debug(config.get('appname') + ':' + req.method, req.originalUrl);
    next();
  });

  return app;
};

module.exports.createRoutes = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(path.join(__dirname, '../..', 'public')));
  app.use('/api', require('../routes/api'));
};

module.exports.handleExpressErrors = (app, config) => {
  app.use((req, res) => {
    if (req.originalUrl.indexOf('map') > -1) {
      return res.redirect('http://' + req.headers.host);
    }

    if (req.originalUrl.indexOf('about') > -1) {
      return res.redirect('http://' + req.headers.host);
    }

    res.status(404);

    if (req.accepts('html')) {
      return res.send('404');
    }

    if (req.accepts('json')) {
      return res.send({error: 404});
    }

    res.type('txt').send('404');
  });

  app.use((err, req, res) => {
    winston.debug(config.get('appname'), 'Express:' + err.stack);
    res.status(500).send('Something broke!');
  });
};
