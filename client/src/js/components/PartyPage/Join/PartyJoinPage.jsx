import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames/bind';

import Page, { PageHeader, PageContent, PageFooter } from 'ui/Page';
import Title from 'ui/Title';
import Button from 'ui/Button';

import styles from './party-join-page.scss';
const cx = classNames.bind(styles);

const PlayerList = ({ players }) => (
  <ul>
    { !players && !players.length
      ? <li>Waiting for parties to joining...</li>
      : players.map(player => (
        <li key={`player-${player._id}`} className={cx('players--item', 'animated', 'roll-in', 'faster')}>
          <div>{player.avatar}</div>
          <h2>{player.nickName}</h2>
        </li>
      ))
    }
  </ul>
);

const PartyJoinPage = ({ fetchParty, party, players }) => {
  useEffect(() => {
    if (!party) fetchParty();
  }, [party]);

  return (
    <Page>
      { party && (
        <Fragment>
          <PageHeader>
            <div>
              <Title>Join {party.partyName}</Title>
            </div>
            <div className={cx('join--passcode')}>
              <Title>{party.passCode}</Title>
              <h2 style={{position: 'absolute'}}>Pass Code</h2>
            </div>
          </PageHeader>
          <PageContent>
            <hr className={cx('is-marginless', 'animated', 'bounce-in-right')}/>
            <PlayerList players={players} />
          </PageContent>
          <PageFooter>
            {(players && players.length) && (
              <div className={cx('animated', 'bounce-in-up')}>
                <Button
                  primary
                  block
                >
                  Start the party  <span>👉</span>
                </Button>
              </div>
            )}
          </PageFooter>
        </Fragment>
      )}
    </Page>
  );
}

export default PartyJoinPage;
