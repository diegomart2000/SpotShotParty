const http = require('http');
const socketIO = require('socket.io');

// Hash for user connections by companyId
const connections = {};

// Client connections handler
exports.serve = function (app) {

  //Create the io reference
  const server = http.Server(app);
  const io = socketIO(server, {
    pingInterval: 500,
  });

  // Handles the connection event
  io.on('connection', function (socket) {
    logger.info('socket server : connection : new client connection');

    socket.on('register', function (partyId, userId) {
      connections[partyId] = connections[partyId] || {};
      connections[partyId][userId] = { socket: socket };
      logger.info('socket server : connection : client connection registered [p: %s, u: %s]', partyId, userId);
    });
  });

  return server;
};
