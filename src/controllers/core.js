const express = require('express');
const path = require('path');
const router = express.Router();
const config = require('../config/config');

module.exports = (app) => {
  app.use(router);
};

router.get('/', (req, res) => {
  res.sendFile(path.join(config.root, '../public/index.html'));
});

router.get('/version', (req, res) => {
  res.json({ version: '0.0.0' });
});
