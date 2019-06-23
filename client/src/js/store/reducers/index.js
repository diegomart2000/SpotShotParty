import { combineReducers } from 'redux';
import user from './UserReducer';
import playlist from './PlaylistReducer';
import party from './PartyReducer';
import player from './PlayerReducer';

export default combineReducers({
  user,
  playlist,
  party,
  player,
});
