const { log } = require('../../util/logger');

const user = app => {
  app.get('/api/me', get);
  return app;
};

const get = async (req, res) => {
  const { user } = req;
  const { player } = req.session;

  log(`API User : get me, it is a ${(user && 'user') || (player && 'player') || 'nobody'}`);
  res.send(user || player);
};

module.exports = user;
