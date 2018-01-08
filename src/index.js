/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View } from 'react-native';
import Users from './pages/users';

// import styles from './styles';

export default class App extends Component {
  static propTypes = {};

  static defaultProps = {};

  static state = {}

  render() {
    return (
      <Users />
    );
  }
}
