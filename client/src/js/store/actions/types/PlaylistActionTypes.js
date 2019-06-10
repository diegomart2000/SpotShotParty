import mirrorCreator from 'mirror-creator';

const PlaylistActionTypes = mirrorCreator([
  'PLAYLIST_FETCH',
  'PLAYLIST_FETCH_SUCCESS',
  'PLAYLIST_FETCH_ERROR',
]);

export default PlaylistActionTypes;
