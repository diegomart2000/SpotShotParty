const crypto = require("crypto");

const { error, log } = require('../util/logger');
const cache = require('../util/cache');
const socket = require('../util/socket');

const Party = require('../model/Party');

const hashCode = (s)  => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);

/**
 * To get a party by id
 * @param {string} partyId
 */
exports.get = async (partyId) => {
  if (!partyId) throw new Error(`Party id is required. Got p:${partyId}`);
  try {
    let party = await cache.get(partyId);
    if (party) return party;

    // Party not found in cache, fetch it
    party = await Party.findById(partyId).exec();
    await cache.set(partyId, party.toJSON());

    return party;
  } catch (err) {
    error(`PartyService : Error while loading party for ${partyId}`, err);
    throw err;
  }
};

/**
 *
 */
exports.create = async (userId, partyName, playlistId) => {
  try {
    log(`PartyService : Party create [u: ${userId}, n: ${partyName}]`);
    const passCode = crypto.randomBytes(2).toString('hex').toUpperCase();
    const party = new Party({ userId, playlistId, name: partyName, passCode });
    await party.save();

    const partyId = party._id.toString();

    // register it on redis to make it fast to fetch
    await cache.set(partyId, party.toJSON());

    // register the event listener
    socket.create(partyId);

    return party;
  } catch (err) {
    error(`PartyService : Error while creating party for ${partyName}`, err);
    throw err;
  }
};

/**
 * Allows a partie to join a party
 */
exports.join = async (nickName, partyName, passCode) => {
  try {
    log(`PartyService : Party create [u: ${nickName}, n: ${partyName}]`);
    const party = await Party.findOne({ name: partyName, passCode }).exec();
    const player = party.parties.create({ nickName });

    // fetch the party from cache

    // register it on redis to make it fast to fetch

    // register the event listener


    return {
      party,
      player
    };

  } catch (err) {
    error(`PartyService : Error while creating party for ${plain}`, err);
    throw err;
  }
};


/**
 * Allows to post an answer to a party question
 */
exports.answer = async (userId, partyId, trackId, questionId, answer) => {
  try {
    log(`PartyService : Party create [u: ${nickName}, n: ${partyName}]`);
    const party = await Party.findOne({ name: partyName, passCode }).exec();
    const player = party.parties.create({ nickName });

    // fetch the party from cache

    // register it on redis to make it fast to fetch

    // register the event listener


    return {
      party,
      player
    };

  } catch (err) {
    error(`PartyService : Error while creating party for ${plain}`, err);
    throw err;
  }
};


