import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

export default connect(mapStateToProps, mapDispatchToProps)(PartyCreatePage);
