const express = require('express');
const glob = require('glob');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV;
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  if (env === 'development')
    app.use(logger('dev'));
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + 'controllers/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.get('*', (req, res) => {
    res.status(505).json({ message: 'You have hit a wild-route' });
  });

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.status(500).json({
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  return app;
};
