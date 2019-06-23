
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
        error: null,
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

    case types.PARTY_FETCH: {
      return {
        ...previousState,
        isFetching: true,
      }
    }

    case types.PARTY_FETCH_SUCCESS: {
      const { party } = payload;

      return {
        ...previousState,
        isFetching: false,
        error: null,
        party,
      }
    }

    case types.PARTY_FETCH_ERROR: {
      const { error } = payload;

      return {
        ...previousState,
        isFetching: false,
        party: null,
        error,
      };
    }

    case types.PARTY_PLAYER_JOINED: {
      const { party } = previousState;
      return {
        ...previousState,
        party: {
          ...party,
          parties: [...party.parties, payload],
        },
      }
    }

    default:
      return previousState;
  }
};

export default reducer;
