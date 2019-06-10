import React from 'react';
import classNames from 'classnames/bind';
import styles from './input.scss';
const cx = classNames.bind(styles);

const Input = ({primary, value, ...props}) => (
  <input value={value} {...props} className={cx('input', 'is-large', {'is-primary': primary})}>
    {props.children}
  </input>
)

export default Input;
