import types from './types/PartyActionTypes';

export const createParty = () => ({
  type: types.PARTY_CREATE,
});

export const createPartySuccess = (party) => ({
  type: types.PARTY_CREATE_SUCCESS,
  payload: { party }
});

export const createPartyError = (error) => ({
  type: types.PARTY_CREATE_ERROR,
  payload: { error }
});
