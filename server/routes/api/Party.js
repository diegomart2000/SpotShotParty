const { log, error } = require('../../util/logger');
const loginRequired = require('../../middleware/LoginRequired');
const PartyService = require('../../service/PartyService');

const Party = app => {
  app.post('/api/party', loginRequired, create);
  app.get('/api/party', get);

  app.put('/api/party/join', join);

  return app;
};

const get = async (req, res) => {
  const { user, session: { partyId } } = req;
  log(`API Party : get : about to get party [p: ${partyId}]`);

  try {
    const party = await PartyService.get(partyId);
    if (!party) {
      return res
        .status(404)
        .send({error: 404, message: `Party ${partyId} not found`});
    }

    res.send(party);
  } catch (err) {
    error(`API Party : get : error on get party [p: ${partyId}]`, err);
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  const { user } = req;
  const { partyName, playlistId } = req.body;

  log(`API Party : create : about to create party [n: ${partyName}, pl: ${playlistId}]`);
  try {
    const party = await PartyService.create(user._id, partyName, playlistId);
    req.session.partyId = party._id.toString();

    log(`API Party : create : party created [p: ${req.session.partyId}]`);

    res.send(party);
  } catch (err) {
    error(`API Party : create : error on create [n: ${partyName}, pl: ${playlistId}]`, err);
    res.status(500).send(err);
  }
};

const join = async (req, res) => {
  const { user } = req;
  res.send(user);
};

module.exports = Party;
