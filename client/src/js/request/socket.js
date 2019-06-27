import io from 'socket.io-client';
export const socket = io(`//${process.env.HOST}:${process.env.PORT}`);

socket.on('connect', () => {
  console.log('Socket connected');

  socket.on('player/joined', (player) => {
    console.log('Player joined', player);
  });

});

export default {
  party(partyId) {
    socket.emit('party/register', partyId, partyId);
  },

  player(partyId, playerId) {
    socket.emit('player/register', partyId, playerId);
  }
};
