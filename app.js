const express = require('express');
const config = require('./src/config/config');
const glob = require('glob');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.connect(config.db, { useMongoClient: true });
mongoose.Promise = bluebird;
const db = mongoose.connection;
db.on('error', () => {
  console.log(config);
  throw new Error('Unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + './app/models/*.js');
models.forEach(function (model) {
  require(model);
});
const app = require('./src/config/express')(express(), config);

module.exports = app;

app.listen(config.port, () => {
  console.log('Magic happening on port ' + config.port);
});
