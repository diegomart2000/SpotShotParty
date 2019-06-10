import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './button.scss';
const cx = classNames.bind(styles);

const Button = ({ primary, block, href, ...props }) => (
  <Fragment>
    { href
      ? <a href={href} className={cx('button', 'is-large', { 'is-primary': primary, 'is-fullwidth': block })}>
         {props.children}
        </a>
      : <button {...props} className={cx('button', 'is-large', { 'is-primary': primary, 'is-fullwidth': block })}>
          {props.children}
        </button>
    }
  </Fragment>
)

export default Button;
