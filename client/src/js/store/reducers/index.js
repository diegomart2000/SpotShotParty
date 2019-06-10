import { combineReducers } from 'redux';
import user from './UserReducer';
import playlist from './PlaylistReducer';

export default combineReducers({
  user,
  playlist,
});
