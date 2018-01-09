/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View, Animated } from 'react-native';

import styles from './styles';

const ballY = new Animated.Value(0);
const ballX = Animated.divide(ballY, 2);
Animated.sub

// divide, mutiply, add

export default class Timing extends Component {
  state = {
    ballY: ballY,
    ballX: ballX,
  };

  timing = () => {
    Animated.timing(this.state.ballY, {
      toValue: 500,
      duration: 1000,
    }).start();
  }

  spring = () => {
    Animated.spring(this.state.ballY, {
      toValue: 300,
      bounciness: 30,
    }).start();
  }

  decay = () => {
    Animated.decay(this.state.ballY, {
      velocity: 1.1 ,
    }).start();
  }

  componentDidMount() {
    this.decay();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.ball,
          { 
            top: this.state.ballY,
            left: this.state.ballX,
          }
        ]} />
      </View>
    );
  }
}
