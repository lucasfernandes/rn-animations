/* Core */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Presentational */
import { View, Animated, PanResponder } from 'react-native';

import styles from './styles';

export default class Timing extends Component {
  state = {
    ball: new Animated.ValueXY({ x: 0, y: 0 }),
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gestureState) => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.ball.setOffset({
          x: this.state.ball.x._value,
          y: this.state.ball.y._value,
        });

        this.state.ball.setValue({ x: 0, y: 0 });
      },

      onPanResponderRelease: () => {
        this.state.ball.flattenOffset();
      },

      onPanResponderMove: Animated.event([null, {
        dx: this.state.ball.x,
        dy: this.state.ball.y,
      }], { listener: (e, gestureState) => {
        console.log(gestureState);
      }}),
    });
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[
          styles.ball,
          { 
            transform: [
              { translateX: this.state.ball.x },
              { translateY: this.state.ball.y },
            ]
          }
        ]} />
      </View>
    );
  }
}
