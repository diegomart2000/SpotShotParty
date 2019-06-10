const logger = require('../../util/logger');

const user = app => {
  app.get('/api/me', get);

  return app;
};

const get = async (req, res) => {
  const { user } = req;
  res.send(user);
};

module.exports = user;
