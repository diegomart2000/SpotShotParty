
import types from 'store/actions/types/PartyActionTypes';

const reducer = (
  previousState = {
    isFetching: true,
  },
  action
) => {
  const { type, payload = {} } = action;

  switch (type) {
    case types.PARTY_CREATE: {
      return {
        ...previousState,
        isFetching: true,
      }
    }

    case types.PARTY_CREATE_SUCCESS: {
      const { party } = payload;

      return {
        ...previousState,
        isFetching: false,
        party,
      }
    }

    case types.PARTY_CREATE_ERROR: {
      const { error } = payload;

      return {
        ...previousState,
        isFetching: false,
        party: null,
        error,
      };
    }

    default:
      return previousState;
  }
};

export default reducer;
