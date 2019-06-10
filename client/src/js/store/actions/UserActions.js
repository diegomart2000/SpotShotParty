import types from './types/UserActionTypes';

export const fetchUser = () => ({
  type: types.USER_FETCH,
});

export const fetchUserSuccess = (user) => ({
  type: types.USER_FETCH_SUCCESS,
  payload: { user }
});

export const fetchUserError = (error) => ({
  type: types.USER_FETCH_ERROR,
  payload: { error }
});
