import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import request from 'request/party';
import socket from 'request/socket';

import { push } from 'utils/history';
import types from 'store/actions/types/PlayerActionTypes';

import {

  joinPartySuccess,
  joinPartyError,

} from '../actions/PlayerActions';


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

export default function* rootSaga() {
  yield all([
    watchPartyJoin(),
  ]);
}
