const logger = require('../util/logger');

const home = app => {
  app.get('/', index);
  app.get('/dashboard', dashboard);

  return app;
};

const index = (req, res) => {

};

const dashboard = (req, res) => {

};

module.exports = home;
