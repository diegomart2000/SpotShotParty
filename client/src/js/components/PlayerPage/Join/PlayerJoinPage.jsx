import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Page, { PageHeader, PageContent, PageFooter } from 'ui/Page';
import Title from 'ui/Title';
import Button from 'ui/Button';
import Input from 'ui/Input';

import AvatarList from  './AvatarList.json';
import styles from './player-join-page.scss';
const cx = classNames.bind(styles);

const PartyForm = ({ partyName, passCode, onChangePartyName, onChangePassCode, hasError }) => (
  <div className={cx('party__form')}>
    <div className={cx('level', 'animated', 'fade-in', 'delay-300ms')}>
      <Input
        value={partyName}
        onChange={({ currentTarget: { value } }) => onChangePartyName(value)}
        placeholder='Party Name?'
        maxLength={20}
        primary
        hasError={hasError}
      />
    </div>

    <div className={cx('level', 'animated', 'fade-in', 'delay-600ms')}>
      <Input
        value={passCode}
        onChange={({ currentTarget: { value } }) => onChangePassCode(value.toUpperCase())}
        placeholder='Party Passcode?'
        maxLength={4}
        primary
        hasError={hasError}
      />
    </div>
  </div>
);

const AvatarSelector = ({ avatars, selected, onSelect }) => (
  <div className={cx('avatars')}>
    {avatars.map((avatar, index) => (
      <span
        key={`emoji-${index}`}
        className={cx('avatars__item', 'animated', 'bounce-in', { 'avatars__item--selected': avatar === selected })}
        style={{ animationDelay: `${900 + index * 50}ms`}}
        onClick={() => onSelect(avatar)}
        >{avatar}  </span>
    ))}
  </div>
);

const UserForm = ({ nickName, onChangeNickName }) => (
  <div className={cx('user__form')}>
    <div className={cx('level', 'animated', 'fade-in', 'delay-1s')}>
      <Input
        value={nickName}
        placeholder='Your nickname'
        onChange={({ currentTarget: { value } }) => onChangeNickName(value)}
        maxLength={24}
        primary
      />
    </div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className={cx('notification', 'is-danger')}>
    {error.message}
  </div>
);

const PartyJoinPage = ({ joinParty, party, error }) => {
  const [partyName, setPartyName] = useState('');
  const [passCode, setPassCode] = useState('');
  const [avatar, setAvatar] = useState('');
  const [nickName, setNickName] = useState('');

  return (
    <Page>
        <Fragment>
          <PageHeader>
            <Title>Join the party</Title>
          </PageHeader>
          <PageContent>
            <hr className={cx('is-marginless', 'animated', 'bounce-in-right')} />

            <PartyForm
              partyName={partyName}
              passCode={passCode}
              onChangePartyName={setPartyName}
              onChangePassCode={setPassCode}
              hasError={!!error}
            />
            {error && <ErrorMessage error={error} />}
            <AvatarSelector
              avatars={AvatarList}
              selected={avatar}
              onSelect={setAvatar}
            />
            <UserForm
              nickName={nickName}
              onChangeNickName={setNickName}
            />
            {(partyName && passCode && avatar && nickName) && (
              <div className={cx('submit')}>
                <Button
                  primary
                  block
                  onClick={() => joinParty({ partyName, passCode, avatar, nickName})}
                >
                  Join me <span>👉</span>
                </Button>
              </div>
            )}
          </PageContent>
        </Fragment>
    </Page>
  );
}

export default PartyJoinPage;
