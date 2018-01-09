/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View, Animated } from 'react-native';

import styles from './styles';

export default class Timing extends Component {
  state = {
    ballY: new Animated.Value(0),
  };

  componentDidMount() {
    
    Animated.timing(this.state.ballY, {
      toValue: 500,
      duration: 1000,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.ball,
          { 
            top: this.state.ballY,
            opacity: this.state.ballY.interpolate({
              inputRange: [0, 300],
              outputRange: [1, 0.2],
              extrapolate: 'clamp',
            }),
          }
        ]} />
      </View>
    );
  }
}
