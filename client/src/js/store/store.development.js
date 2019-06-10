import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import promiseMiddleware from 'redux-promise';

import rootReducer from './reducers';
import rootSagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const devTools = window.devToolsExtension ? window.devToolsExtension : (() => (x) => x);

const middlewares = [
  promiseMiddleware,
  sagaMiddleware
];

const enhancers = compose(
  applyMiddleware(...middlewares),
  devTools(),
);

export default function configureStore(initialState) {

  const store = createStore(
    rootReducer,
    initialState,
    enhancers
  );

  // Extensions
  rootSagas.map(sagaMiddleware.run);
  
  // Enable hot module replacement for reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
