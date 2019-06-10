import React from 'react';
import classNames from 'classnames/bind';
import styles from './title.scss';
const cx = classNames.bind(styles);

const Title = (props) => (
  <h1 {...props} className={cx('title')}>
    {props.children}
  </h1>
)

export default Title;
