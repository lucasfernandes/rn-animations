/* Core */
import React, { Component } from 'react';

/* Presentational */
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const { width } = Dimensions.get('window');

export default class User extends Component {
  state = {
    offset: new Animated.ValueXY({ x: 0, y: 50 }),
    opacity: new Animated.Value(0),
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event([null, {
        dx: this.state.offset.x,
      }]),

      onPanResponderRelease: () => {
        if (this.state.offset.x._value < -200)
          Alert.alert('Deleted!');

        Animated.spring(this.state.offset.x, {
          toValue: 0,
          bounciness: 10,
        }).start();
      },

      onPanResponderTerminate: () => {
        Animated.spring(this.state.offset.x, {
          toValue: 0,
          bounciness: 10,
        }).start();
      },
    });
  }

  componentDidMount() {
    Animated.parallel([
      Animated.spring(this.state.offset.y, {
        toValue: 7,
        speed: 5,
        bounciness: 20,
      }),

      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 600,
      })
    ]).start();
    
  }

  render() {
    const { user } = this.props;
    const rotate = {
      rotateZ: this.state.offset.x.interpolate({
        inputRange: [width * -1, 0, width],
        outputRange: ['-50deg', '0deg', '50deg'],
      }),
    };

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[
          { transform: [
              ...this.state.offset.getTranslateTransform(),
              rotate,
              { perspective: 1000 }
            ]
          },
          { opacity: this.state.opacity },
        ]}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={styles.userContainer}>
            <Image
              style={styles.thumbnail}
              source={{ uri: user.thumbnail }}
            />

            <View style={[styles.infoContainer, { backgroundColor: user.color }]}>
              <View style={styles.bioContainer}>
                <Text style={styles.name}>{user.name.toUpperCase()}</Text>
                <Text style={styles.description}>{user.description}</Text>
              </View>
              <View style={styles.likesContainer}>
                <Icon name="heart" size={12} color="#FFF" />
                <Text style={styles.likes}>{user.likes}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

