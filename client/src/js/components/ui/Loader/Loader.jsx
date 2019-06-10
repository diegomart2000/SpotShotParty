import React, { Fragment } from 'react';
import classNames from 'classnames/bind';

import styles from './loader.scss';
const cx = classNames.bind(styles);

const Loader = () => (
  <div className={cx('loader')}>
    <h1>Spot Shot Party</h1>
  </div>
);
export default Loader;
