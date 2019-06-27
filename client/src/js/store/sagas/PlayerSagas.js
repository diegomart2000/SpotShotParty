import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import request from 'request/party';
import userRequest from 'request/user';
import socket from 'request/socket';

import { push } from 'utils/history';
import types from 'store/actions/types/PlayerActionTypes';
import { playerSelector } from 'store/selectors/player';
import { partySelector } from 'store/selectors/party';

import {

  joinPartySuccess,
  joinPartyError,

  fetchPlayerSuccess,
  fetchPlayerError,

} from '../actions/PlayerActions';

import {

  fetchPartySuccess,
  fetchPartyError,

} from '../actions/PartyActions';

// Party Join
export function* doPartyJoin(action) {
  try {
    const { payload: { player } } = action;
    const { data } = yield call(request.join, player);
    yield put(joinPartySuccess(data));
  } catch (error) {
    yield put(joinPartyError(error.response.data));
  }
}

// Watches for PLAYER_JOIN action and calls handler
export function* watchPartyJoin() {
  yield takeLatest(types.PLAYER_JOIN, doPartyJoin);
}

// Player Fetch
export function* doPlayerFetch(action) {
  try {
    const player = yield select(playerSelector);
    const party = yield select(partySelector);

    if (!player || !party) {
      const { data: playerData } = yield call(userRequest.fetch);
      yield put(fetchPlayerSuccess(playerData));

      const { data: partyData } = yield call(request.fetch);
      yield put(fetchPartySuccess(partyData));

      yield call(socket.player, partyData._id, playerData._id);
    }

  } catch (error) {
    yield put(fetchPlayerError(error.response.data));
  }
}

// Watches for PLAYER_FETCH action and calls handler
export function* watchPlayerFetch() {
  yield takeLatest(types.PLAYER_FETCH, doPlayerFetch);
}

export default function* rootSaga() {
  yield all([
    watchPartyJoin(),
    watchPlayerFetch(),
  ]);
}
