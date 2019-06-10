
import types from 'store/actions/types/PlaylistActionTypes';

const reducer = (
  previousState = {
    isFetching: true,
  },
  action
) => {
  const { type, payload = {} } = action;

  switch (type) {
    case types.PLAYLIST_FETCH: {
      return {
        ...previousState,
        isFetching: true,
      }
    }

    case types.PLAYLIST_FETCH_SUCCESS: {
      const { playlists } = payload;

      return {
        ...previousState,
        isFetching: false,
        playlists,
      }
    }

    case types.PLAYLIST_FETCH_ERROR: {
      const { error } = payload;

      return {
        ...previousState,
        isFetching: false,
        playlists: null,
        error,
      };
    }

    default:
      return previousState;
  }
};

export default reducer;
