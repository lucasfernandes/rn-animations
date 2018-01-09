/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View, Animated } from 'react-native';

import styles from './styles';

export default class Timing extends Component {
  state = {
    ballY: new Animated.Value(0),
    ballX: new Animated.Value(0),
  };

  // timingY = () =>  Animated.timing(this.state.ballY, {
  //   toValue: 200,
  //   duration: 500,
  // });
  
  // timingX = () => Animated.timing(this.state.ballX, {
  //   toValue: 200,
  //   duration: 500,
  // });
  
  // Animated.parallel - executes in parallel
  // Animated.sequence - executes in sequence (one after another)
  // Animated.sequence([
  //   this.timingY(),
  //   Animated.delay(1000),
  //   this.timingX(),
  // ]).start();


  // executes each animation after a specifica time (paralel after this time)
  // Animated.stagger(300, [
  //   this.timingY(),
  //   Animated.delay(1000),
  //   this.timingX(),
  // ]).start();

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.ballY, {
          toValue: 200,
          duration: 500,
        }),

        Animated.delay(500),

        Animated.timing(this.state.ballX, {
          toValue: 200,
          duration: 500,
        }),

        Animated.delay(500),

        Animated.timing(this.state.ballY, {
          toValue: 0,
          duration: 500,
        }),

        Animated.delay(500),

        Animated.timing(this.state.ballX, {
          toValue: 0,
          duration: 500,
        }),

        Animated.delay(500),
      ]), {
        iterations: 2,
      },
     ).start();
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
