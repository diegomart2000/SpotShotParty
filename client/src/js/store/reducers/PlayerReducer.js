
import types from 'store/actions/types/PlayerActionTypes';

const reducer = (
  previousState = {
    isFetching: true,
  },
  action
) => {
  const { type, payload = {} } = action;

  switch (type) {
    case types.PLAYER_JOIN: {
      return {
        ...previousState,
        isFetching: true,
        player: null,
        error: null,
      };
    }

    case types.PLAYER_JOIN_SUCCESS: {
      return {
        ...previousState,
        isFetching: false,
        player: payload,
      };
    }

    case types.PLAYER_JOIN_ERROR: {
      const { error } = payload;

      return {
        ...previousState,
        isFetching: false,
        player: null,
        error,
      };
    }


    case types.PLAYER_FETCH: {
      return {
        ...previousState,
        isFetching: true,
        player: null,
        error: null,
      };
    }

    case types.PLAYER_FETCH_SUCCESS: {
      return {
        ...previousState,
        isFetching: false,
        player: payload,
      };
    }

    case types.PLAYER_FETCH_ERROR: {
      const { error } = payload;

      return {
        ...previousState,
        isFetching: false,
        player: null,
        error,
      };
    }

    default:
      return previousState;
  }
};

export default reducer;
