import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Page, { PageHeader, PageContent } from 'ui/Page';
import Title from 'ui/Title';
import Subtitle from 'ui/Subtitle';

import styles from './player-waiting-page.scss';
const cx = classNames.bind(styles);

const PartyJoinPage = ({ player, error }) => {

  return (
    <Page>
        <Fragment>
          <PageContent>
            <Title><span className={cx('avatar')}>{player.avatar}</span> {player.nickName}</Title>
            <Subtitle>Let's wait for others to join...</Subtitle>
          </PageContent>
        </Fragment>
    </Page>
  );
}

export default PartyJoinPage;
