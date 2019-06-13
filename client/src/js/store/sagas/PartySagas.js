import { takeLatest, call, put, all } from 'redux-saga/effects';
import request from 'request/party';

import types from 'store/actions/types/PartyActionTypes';

import {
  createPartySuccess,
  createPartyError,

} from '../actions/PartyActions';

// Party Create
export function* doPartyCreate(action) {
  try {
    const { payload: { party }} = action;
    const { data } = yield call(request.create, party);
    yield put(createPartySuccess(data));

  } catch (error) {
    yield put(createPartyError(error.response.data));
  }
}

// Watches for USER_FETCH action and calls handler
export function* watchPartyCreate() {
  yield takeLatest(types.USER_FETCH, doPartyCreate);
}

export default function* rootSaga() {
  yield all([
    watchPartyCreate(),
  ]);
}
