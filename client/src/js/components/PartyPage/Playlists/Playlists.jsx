import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames/bind';

import Subtitle from 'ui/Subtitle';

import styles from './playlists.scss';
const cx = classNames.bind(styles);

const Thumb = ({src}) => (
  <div className={cx('thumb')} style={{backgroundImage: `url(${src})`}}/>
);

const List = ({ list, selected, onSelect }) => (
  <Fragment>
    {list.map((playlist, i) => (
      <li
        key={playlist.id}
        className={cx('playlists__item', { 'playlists__item--selected': (playlist.id === selected)})}
        onClick={() => onSelect(playlist.id)}
      >
        <Thumb src={playlist.thumb.url}/>
        <Subtitle>{playlist.name}</Subtitle>
      </li>
    ))}
  </Fragment>
);

const Playlists = ({fetchPlaylist, isFetching, list, selected, onSelect}) => {
  useEffect(() => {
    if (!list) fetchPlaylist();
  }, [list]);

  return (
    <ul className={cx('playlists')}>
      {isFetching
        ? <li><Subtitle>Buttering some playlists...</Subtitle></li>
        : <List list={list} selected={selected} onSelect={onSelect} />
      }
    </ul>
  );
};

export default Playlists;
