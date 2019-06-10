import { takeLatest, call, put, all } from 'redux-saga/effects';
import request from 'request/user';
import spotify from 'request/spotify';

import types from 'store/actions/types/UserActionTypes';

import {
  fetchUserSuccess,
  fetchUserError,

} from '../actions/UserActions';

// User FETCH
export function* doFetchUser(action) {
  try {
    const { data } = yield call(request.fetch);
    yield call(spotify.setAccessToken, data.accessToken);
    yield put(fetchUserSuccess(data));

  } catch (error) {
    yield put(fetchUserError(error.response.data));
  }
}

// Watches for USER_FETCH action and calls handler
export function* watchUserFetch() {
  yield takeLatest(types.USER_FETCH, doFetchUser);
}

export default function* rootSaga() {
  yield all([
    watchUserFetch(),
  ]);
}
