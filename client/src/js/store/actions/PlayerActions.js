import types from './types/PlayerActionTypes';

export const joinParty = (player) => ({
  type: types.PLAYER_JOIN,
  payload: { player }
});

export const joinPartySuccess = (payload) => ({
  type: types.PLAYER_JOIN_SUCCESS,
  payload,
});

export const joinPartyError = (error) => ({
  type: types.PLAYER_JOIN_ERROR,
  payload: { error }
});
