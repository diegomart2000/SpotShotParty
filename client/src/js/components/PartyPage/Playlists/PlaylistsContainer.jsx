import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchPlaylist } from 'store/actions/PlaylistActions';
import { isFetchingSelector, playlistsSelector, errorSelector } from 'store/selectors/playlists';

import Playlists from './Playlists';

const mapStateToProps = state => ({
  isFetching: isFetchingSelector(state),
  list: playlistsSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPlaylist,
    },

    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
