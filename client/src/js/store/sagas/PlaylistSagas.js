import { takeLatest, call, put, all } from 'redux-saga/effects';
import request from 'request/spotify';
import types from 'store/actions/types/PlaylistActionTypes';

import {
  fetchPlaylistSuccess,
  fetchPlaylistError,
} from '../actions/PlaylistActions';

// Playlist FETCH
export function* doFetchPlaylist(action) {
  try {
    const { body: { playlists } } = yield call(request.getPartyPlaylists);
    yield put(fetchPlaylistSuccess(playlists));

  } catch (error) {
    yield put(fetchPlaylistError(error.response.data));
  }
}

// Watches for PLAYLIST_FETCH action and calls handler
export function* watchPlaylistFetch() {
  yield takeLatest(types.PLAYLIST_FETCH, doFetchPlaylist);
}

export default function* rootSaga() {
  yield all([
    watchPlaylistFetch(),
  ]);
}
