import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import request from 'request/party';
import socket from 'request/socket';

import { push } from 'utils/history';
import types from 'store/actions/types/PartyActionTypes';
import { partySelector } from 'store/selectors/party';

import {
  createPartySuccess,
  createPartyError,

  fetchPartySuccess,
  fetchPartyError,

} from '../actions/PartyActions';

// Party Create
export function* doPartyCreate(action) {
  try {
    const { payload: { party }} = action;
    const { data } = yield call(request.create, party);
    yield put(createPartySuccess(data));
    yield call(push, '/party/join');
    yield call(socket.party, data._id);

  } catch (error) {
    yield put(createPartyError(error.response.data));
  }
}

// Watches for PARTY_CREATE action and calls handler
export function* watchPartyCreate() {
  yield takeLatest(types.PARTY_CREATE, doPartyCreate);
}


// Party Fetch
export function* doPartyFetch(action) {
  try {
    const party = yield select(partySelector);
    if ( !party ) {
      const { data } = yield call(request.fetch);
      yield put(fetchPartySuccess(data));
      yield call(socket.party, data._id);
    }
  } catch (error) {
    yield put(fetchPartyError(error.response.data));
  }
}

// Watches for PARTY_FETCH action and calls handler
export function* watchPartyFetch() {
  yield takeLatest(types.PARTY_FETCH, doPartyFetch);
}

export default function* rootSaga() {
  yield all([
    watchPartyCreate(),
    watchPartyFetch(),
  ]);
}
