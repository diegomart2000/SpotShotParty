
import types from 'store/actions/types/UserActionTypes';

const reducer = (
  previousState = {
    isFetching: true,
  },
  action
) => {
  const { type, payload = {} } = action;

  switch (type) {
    case types.USER_FETCH: {
      return {
        ...previousState,
        isFetching: true,
      }
    }

    case types.USER_FETCH_SUCCESS: {
      const { user } = payload;

      return {
        ...previousState,
        isFetching: false,
        user,
      }
    }

    case types.USER_FETCH_ERROR: {
      const { error } = payload;

      return {
        ...previousState,
        isFetching: false,
        user: null,
        error,
      };
    }

    default:
      return previousState;
  }
};

export default reducer;
