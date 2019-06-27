const http = require('http');
const socketIO = require('socket.io');
const { log, error } = require('./logger');

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
    log('socket server : connection : new client connection');
    socket.on('player/register', playerRegister(socket));
    socket.on('party/register', partyRegister(socket));
  });

  return server;
};

// Incomming events
const playerRegister = socket => (partyId, userId) => {
  connections[partyId][userId] = { socket };
  log('socket server : connection : client connection registered [p: %s, u: %s]', partyId, userId);
};


const partyRegister = socket => (partyId) => {
  connections[partyId] = connections[partyId] || {};

  connections[partyId].party = { socket };
  log(`socket server : connection : party connection registered [p: ${partyId}]`);
};

// Outgoing events
exports.broadcast = (event, partyId, ...params) => {
  log(`socket server : broadcast : about to broadcast [e: ${event}, p: ${partyId}]`);

  if (connections[partyId]) {
    const parties = connections[partyId];
    log(`socket server : broadcast : party found, broadcasting [e: ${event}, to: ${Object.keys(parties).length}]`);
    Object.values(parties).map(client => client.socket.emit(event, ...params));
  }
};

exports.notify = (event, partyId, userId, ...params) => {
  log(`socket server : notify : about to notify [e: ${event}, p: ${partyId}]`);
  const party = connections[partyId];
  if (party && party[userId]) {
    const player = party[userId];
    log(`socket server : notify : party found, notifying [e: ${event}]`);
    player.socket.emit(event, ...params);
  }
};

// To allow create a party
exports.create = (partyId) => {
  log(`socket server : create : about to create party connections [p: ${partyId}]`);
  connections[partyId] = {};
};
