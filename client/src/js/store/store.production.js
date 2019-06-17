import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import promiseMiddleware from 'redux-promise';
import socketMiddleware from './middleware/socketmw';

import rootReducer from './reducers';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  promiseMiddleware,
  sagaMiddleware,
  socketMiddleware,
];

const enhancer = compose(applyMiddleware(...middlewares))(createStore);

export default function configureStore(initialState) {
  const store = enhancer(rootReducer, initialState);
  rootSagas.map(sagaMiddleware.run);

  return store;
}
