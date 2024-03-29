import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { createParty } from 'store/actions/PartyActions';
import { isFetchingSelector, partySelector, errorSelector } from 'store/selectors/party';

import PartyCreatePage from './PartyCreatePage';

const mapStateToProps = state => ({
  isFetching: isFetchingSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createParty,
    },

    dispatch
  );

const withAll = compose(
  withRouter, // to prevent 'Failed prop type: Invalid prop `component` supplied to `Route`'
  connect(mapStateToProps, mapDispatchToProps),
);

export default withAll(PartyCreatePage);
