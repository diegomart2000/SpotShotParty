const { log, error } = require('../../util/logger');
const loginRequired = require('./middleware/LoginRequired');
const PartyService = require('../../service/PartyService');

const Party = app => {
  app.post('/api/party', loginRequired, create);
  app.get('/api/party/:id', get);

  app.put('/api/party/join', join);

  return app;
};

const get = async (req, res) => {
  const { user } = req;
  res.send(user);
};

const create = async (req, res) => {
  const { user } = req;
  const { partyName, playlistId } = req.body;

  log(`API Party : create : about to create party [n: ${partyName}, pl: ${playlistId}]`);
  try {
    const party = await PartyService.create(user._id, partyName, playlistId);
    res.send(party);
  } catch (err) {
    error(`API Party : create : error on create [n: ${partyName}, pl: ${playlistId}]`, error);
    res.status(500).send(err);
  }
};

const join = async (req, res) => {
  const { user } = req;
  res.send(user);
};

module.exports = Party;
