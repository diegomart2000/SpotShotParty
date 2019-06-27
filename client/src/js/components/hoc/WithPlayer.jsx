import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { fetchPlayer } from 'store/actions/PlayerActions';

import Loader from 'ui/Loader';

const playerSelector = ({player}) => player;

const mapStateToProps = state => ({
  isFetching: playerSelector(state).isFetching,
  player: playerSelector(state).player,
  error: playerSelector(state).error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPlayer,
    },

    dispatch
  );

const WithPlayer = (WrappedComponent) => {
  const WithPlayerData = (props) => {
    const { fetchPlayer, isFetching, player, error } = props;
    useEffect(() => {
      if(error) {
        props.history.push('/');
        return;
      }

      if (!player) fetchPlayer();
    }, [player, error]);

    return (
      <Fragment>
        { (isFetching || error)
          ? <Loader />
          : <WrappedComponent {...props} />
        }
      </Fragment>
    )
  }

  WithPlayerData.displayName = `WithPlayerData(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(WithPlayerData));
};

export default WithPlayer;
