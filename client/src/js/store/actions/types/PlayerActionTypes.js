import mirrorCreator from 'mirror-creator';

const PartyActionTypes = mirrorCreator([
  'PLAYER_JOIN',
  'PLAYER_JOIN_SUCCESS',
  'PLAYER_JOIN_ERROR', ,

  'PLAYER_FETCH',
  'PLAYER_FETCH_SUCCESS',
  'PLAYER_FETCH_ERROR', ,
]);

export default PartyActionTypes;
