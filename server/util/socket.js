const http = require('http');
const socketIO = require('socket.io');

// Hash for user connections by companyId
const connections = {};

// Client connections handler
exports.serve = (app) => {

  //Create the io reference
  const server = http.Server(app);
  const io = socketIO(server, {
    pingInterval: 500,
  });

  // Handles the connection event
  io.on('connection', (socket) => {
    logger.info('socket server : connection : new client connection');
    socket.on('player/register', reqister(socket));
  });

  return server;
};

// Incomming events
const reqister = socket => (partyId, userId) => {
  connections[partyId][userId] = { socket };
  logger.info('socket server : connection : client connection registered [p: %s, u: %s]', partyId, userId);
};

// Outgoing events
exports.broadcast = (event, partyId, ...params) => {
  logger.info(`socket server : broadcast : about to broadcast [e: ${event}, p: ${partyId}]`);

  if (connections[partyId]) {
    const parties = connections[partyId];
    logger.info(`socket server : broadcast : party found, broadcasting [e: ${event}, to: ${Object.keys(parties).length}]`);
    Object.values(parties).map(client => client.socket.emit(event, {...params}));
  }
};

exports.notify = (event, partyId, userId, ...params) => {
  logger.info(`socket server : notify : about to notify [e: ${event}, p: ${partyId}]`);
  const party = connections[partyId];
  if (party && party[userId]) {
    const player = party[userId];
    logger.info(`socket server : notify : party found, notifying [e: ${event}]`);
    player.socket.emit(event, { ...params });
  }
};

// To allow create a party
exports.create = (partyId) => connections[partyId] = {};
