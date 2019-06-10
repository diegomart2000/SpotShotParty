import React from 'react';
import classNames from 'classnames/bind';
import styles from './subtitle.scss';
const cx = classNames.bind(styles);

const Subtitle = (props) => (
  <h2 {...props} className={cx('subtitle', 'has-text-light')}>
    {props.children}
  </h2>
)

export default Subtitle;
