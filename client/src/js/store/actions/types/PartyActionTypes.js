import mirrorCreator from 'mirror-creator';

const PartyActionTypes = mirrorCreator([
  'PARTY_CREATE',
  'PARTY_CREATE_SUCCESS',
  'PARTY_CREATE_ERROR',

  'PARTY_FETCH',
  'PARTY_FETCH_SUCCESS',
  'PARTY_FETCH_ERROR',,

  'PARTY_PLAYER_JOIN',
]);

export default PartyActionTypes;
