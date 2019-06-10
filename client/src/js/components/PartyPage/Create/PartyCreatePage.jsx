import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import classNames from 'classnames/bind';

import Button from 'ui/Button';
import Input from 'ui/Input';
import Title from 'ui/Title';

import styles from './party-create-page.scss';
const cx = classNames.bind(styles);

import withUser from 'components/hoc/WithUser';
import Playlists from '../Playlists';

const PartyCreatePage = ({user}) => {
  const [ playlistId, setPlaylist ] = useState('');
  const [ name, setName ] = useState('');

  return (
    <Fragment>
      <div className={cx('container')}>
        <div className={cx('level', 'has-text-centered')}>
          <Title>Alright {user.userName}, let's create your party 🎉</Title>
        </div>

        <div className={cx('level')}>
          <Input value={name} onChange={({target: {value}}) => setName(value)} primary placeholder='Give it a rockerz name in here...' />
        </div>

        <div className={cx('level')}>
          <Playlists
            selected={playlistId}
            onSelect={setPlaylist}
        />
        </div>

        {( playlistId && name ) && (
          <div className={cx('level-right')}>
            <div className={cx('level-item')}>
              <Button
                primary
                block
                href='http://localhost:8080/auth'
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

const withAll = compose(
  withRouter, // to prevent 'Failed prop type: Invalid prop `component` supplied to `Route`'
  withUser,
);

export default withAll(PartyCreatePage);
