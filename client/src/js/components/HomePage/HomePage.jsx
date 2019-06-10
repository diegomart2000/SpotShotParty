import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from 'ui/Button';

import styles from './home-page.scss';
const cx = classNames.bind(styles);

const Ssp = () => (
  <div className={cx('ssp')}>
    <div>
      <h1>Spot Shot Party</h1>
    </div>
  </div>
);

// http://nmajor.com/posts/using-socket-io-with-redux-websocket-redux-middleware
// https://xuopled.github.io/react-svg-donut-chart/
// https://www.color-hex.com/color-palette/57266
// https://unsplash.com/search/photos/music-festival
// https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf
// https://codepen.io/rainner/pen/BEOyJq
const HomePage = () => (
  <div className={cx('container')}>
    <Ssp />

    <div className={cx('columns', 'is-centered')}>
      <div className={cx('column', 'is-4')}>
        <Button
          primary
          block
          href='http://localhost:8080/auth'
          >
          Let's do this
        </Button>
      </div>
    </div>
  </div>
);

export default HomePage;
