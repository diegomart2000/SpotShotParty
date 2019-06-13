import mirrorCreator from 'mirror-creator';

const PartyActionTypes = mirrorCreator([
  'PARTY_CREATE',
  'PARTY_CREATE_SUCCESS',
  'PARTY_CREATE_ERROR',

  'PARTY_SETUP_FETCH',
]);

export default PartyActionTypes;
