/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View } from 'react-native';
import Timing from './pages/timing';

// import styles from './styles';

export default class App extends Component {
  render() {
    return (
      <Timing />
    );
  }
}
