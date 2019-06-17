import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Page, { PageHeader, PageContent, PageFooter } from 'ui/Page';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Title from 'ui/Title';

import styles from './party-create-page.scss';
const cx = classNames.bind(styles);

import withUser from 'components/hoc/WithUser';
import Playlists from '../Playlists';

const PartyCreatePage = ({ user, createParty }) => {
  const [ playlistId, setPlaylist ] = useState('');
  const [ partyName, setName ] = useState('');

  return (
    <Page>
      <PageHeader>
          <Title>Alright {user.userName}, let's create your party</Title>
      </PageHeader>

      <PageContent>
        <div className={cx('level', 'animated', 'fade-in', 'delay-300ms')}>
          <Input value={partyName} onChange={({target: {value}}) => setName(value)} primary placeholder='Give it a rockerz name in here...' />
        </div>

        <div className={cx('level', 'animated', 'fade-in', 'delay-600ms')}>
          <Playlists
            selected={playlistId}
            onSelect={setPlaylist}
        />
        </div>
      </PageContent>

      <PageFooter>
        {( playlistId && partyName ) && (
          <div className={cx('animated', 'bounce-in-up')}>
            <Button
              primary
              block
              onClick={() => createParty({ partyName, playlistId })}
              >
              GO  <span>👉</span>
            </Button>
          </div>
        )}
      </PageFooter>
    </Page>
  );
}

export default withUser(PartyCreatePage);
