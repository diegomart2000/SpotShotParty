import types from './types/PlaylistActionTypes';

export const fetchPlaylist = () => ({
  type: types.PLAYLIST_FETCH,
});

export const fetchPlaylistSuccess = (playlists) => ({
  type: types.PLAYLIST_FETCH_SUCCESS,
  payload: { playlists }
});

export const fetchPlaylistError = (error) => ({
  type: types.PLAYLIST_FETCH_ERROR,
  payload: { error }
});
