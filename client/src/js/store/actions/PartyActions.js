import types from './types/PartyActionTypes';

export const createParty = (party) => ({
  type: types.PARTY_CREATE,
  payload: { party }
});

export const createPartySuccess = (party) => ({
  type: types.PARTY_CREATE_SUCCESS,
  payload: { party }
});

export const createPartyError = (error) => ({
  type: types.PARTY_CREATE_ERROR,
  payload: { error }
});

export const fetchParty = () => ({
  type: types.PARTY_FETCH
});

export const fetchPartySuccess = (party) => ({
  type: types.PARTY_FETCH_SUCCESS,
  payload: { party }
});

export const fetchPartyError = (error) => ({
  type: types.PARTY_FETCH_ERROR,
  payload: { error }
});
