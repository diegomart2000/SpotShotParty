import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames/bind';

import Title from 'ui/Title';
import Button from 'ui/Button';

import styles from './party-join-page.scss';
const cx = classNames.bind(styles);

const PartyJoinPage = ({ fetchParty, party }) => {
  useEffect(() => {
    if (!party) fetchParty();
  }, [party]);

  return (
    <Fragment>
      { party && (
        <div className={cx('container')}>
          <div className={cx('level', 'has-text-centered')}>
            <div>
              <Title>Join {party.partyName}</Title>
            </div>

            <div className={cx('join--passcode')}>
              <Title>{party.passCode}</Title>
              <h2 style={{position: 'absolute'}}>Pass Code</h2>
            </div>
          </div>
          <hr />
        </div>
      )}
    </Fragment>
  );
}

export default PartyJoinPage;
