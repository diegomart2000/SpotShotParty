import { socket } from 'request/socket';
import actions from '../actions/SocketActions';

const socketMiddleware = (listeners) => store => next => {
  // Register here listeners and use next to dispatch actions
  listeners.map(listener => {
    const { event, type } = listener;
    socket.on(event, (payload) => {
      debugger;
      next({
        type,
        payload,
      })
    })
  });

  return action => {
    // Check if has some emiter
    if ( action.emit ) {
      debugger;
      socket.emit(action.emit, action.payload);
    }

    return next(action);
  };
};

export default socketMiddleware(actions);
