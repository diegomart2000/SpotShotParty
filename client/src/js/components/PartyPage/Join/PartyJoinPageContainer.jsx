import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { fetchParty } from 'store/actions/PartyActions';
import { isFetchingSelector, partySelector, playersSelector, errorSelector } from 'store/selectors/party';

import withUser from 'components/hoc/WithUser';

import PartyJoinPage from './PartyJoinPage';

const mapStateToProps = state => ({
  isFetching: isFetchingSelector(state),
  party: partySelector(state),
  error: errorSelector(state),

  players: playersSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchParty,
    },

    dispatch
  );

const withAll = compose(
  withRouter, // to prevent 'Failed prop type: Invalid prop `component` supplied to `Route`'
  withUser,
  connect(mapStateToProps, mapDispatchToProps),
);

export default withAll(PartyJoinPage);
