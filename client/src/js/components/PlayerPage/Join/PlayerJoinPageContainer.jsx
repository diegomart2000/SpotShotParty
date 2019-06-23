import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { joinParty } from 'store/actions/PlayerActions';
import { isFetchingSelector, playerSelector, errorSelector } from 'store/selectors/player';

import PlayerJoinPage from './PlayerJoinPage';

const mapStateToProps = state => ({
  isFetching: isFetchingSelector(state),
  player: playerSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      joinParty,
    },

    dispatch
  );

const withAll = compose(
  withRouter, // to prevent 'Failed prop type: Invalid prop `component` supplied to `Route`'
  connect(mapStateToProps, mapDispatchToProps),
);

export default withAll(PlayerJoinPage);
