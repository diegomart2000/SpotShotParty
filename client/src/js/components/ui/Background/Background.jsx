import React from 'react';
import classNames from 'classnames/bind';
import styles from './background.scss';
const cx = classNames.bind(styles);

const Background = ({ children }) => (
  <div className={cx('background')}>
    {children}
  </div>
);

export default Background;
