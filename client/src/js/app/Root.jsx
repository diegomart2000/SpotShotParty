import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import routes from './routes';
import history from 'utils/history';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
