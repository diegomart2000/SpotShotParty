import mirrorCreator from 'mirror-creator';

const UserActionTypes = mirrorCreator([
  'USER_FETCH',
  'USER_FETCH_SUCCESS',
  'USER_FETCH_ERROR',
]);

export default UserActionTypes;
