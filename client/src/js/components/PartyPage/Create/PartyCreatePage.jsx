import React, { Fragment, useState } from 'react';
import classNames from 'classnames/bind';

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
    <Fragment>
      <div className={cx('container')}>
        <div className={cx('level', 'has-text-centered')}>
          <Title>Alright {user.userName}, let's create your party</Title>
        </div>

        <div className={cx('level')}>
          <Input value={partyName} onChange={({target: {value}}) => setName(value)} primary placeholder='Give it a rockerz name in here...' />
        </div>

        <div className={cx('level')}>
          <Playlists
            selected={playlistId}
            onSelect={setPlaylist}
        />
        </div>

        {( playlistId && partyName ) && (
          <div className={cx('level-right')}>
            <div className={cx('level-item')}>
              <Button
                primary
                block
                onClick={() => createParty({ partyName, playlistId })}
                >
                GO  <span>👉</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default withUser(PartyCreatePage);
