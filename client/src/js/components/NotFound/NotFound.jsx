import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './not-found.scss';
const cx = classNames.bind(styles);

import Title from 'ui/Title';

export default class NotFound extends Component {
  render() {
    return (
      <div className={cx('container', 'not-found')}>
        <Title>I bet that's not a party, 404! 🤔</Title>
        <hr />
        <Link to="/">Back To Home</Link>
      </div>
    );
  }
}
