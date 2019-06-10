import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const App = (props) => (
  <Fragment>
    {props.children}
  </Fragment>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
