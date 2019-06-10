import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { fetchUser } from 'store/actions/UserActions';

import Loader from 'ui/Loader';

const userSelector = ({user}) => user;

const mapStateToProps = state => ({
  isFetching: userSelector(state).isFetching,
  user: userSelector(state).user,
  error: userSelector(state).error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUser,
    },

    dispatch
  );

const WithUser = (WrappedComponent) => {
  const WithUserData = (props) => {
    const { fetchUser, isFetching, user, error } = props;
    useEffect(() => {
      if(error) {
        props.history.push('/');
        return;
      }

      if (!user) fetchUser();
    }, [user, error]);

    return (
      <Fragment>
        { (isFetching || error)
          ? <Loader />
          : <WrappedComponent {...props} />
        }
      </Fragment>
    )
  }

  WithUserData.displayName = `WithUserData(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(WithUserData));
};

export default WithUser;
