import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder
} from 'react-native';

import User from './components/User';
import styles from './styles';

const { width } = Dimensions.get('window');

export default class App extends Component {
  state = {
    userSelected: null,
    userInfoVisible: false,
    users: [
      {
        id: 1,
        name: 'React Native',
        description: 'Everything you need to learn',
        avatar: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4',
        thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80',
        likes: 200,
        color: '#57BCBC',
      },
      {
        id: 2,
        name: 'Books',
        description: 'You got to read more',
        avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
        thumbnail: 'https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80',
        likes: 350,
        color: '#E75A63',
      },
      {
        id: 3,
        name: 'Letters',
        description: 'Do you remember that?',
        avatar: 'https://avatars0.githubusercontent.com/u/4669899?s=460&v=4',
        thumbnail: 'https://images.unsplash.com/photo-1506440905961-0ab11f2ed5bc?auto=format&fit=crop&w=400&q=80',
        likes: 250,
        color: '#2E93E5',
      },
      {
        id: 4,
        name: 'Books',
        description: 'You got to read more',
        avatar: 'https://avatars2.githubusercontent.com/u/861751?s=460&v=4',
        thumbnail: 'https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&w=400&q=80',
        likes: 350,
        color: '#E75A63',
      },
    ],
    scrollOffset: new Animated.Value(0),
    listProgress: new Animated.Value(0),
    listOpacity: new Animated.Value(1),
    userInfoProgress: new Animated.Value(0),
    scrollStarted: false,
  }

  componentDidMount() {
    Animated.spring(this.state.scrollOffset, {
      toValue: 200,
      speed: 5,
      bounciness: 20,
    }).start();
  }

  selectUser = (user) => {
    this.setState({ userSelected: user });

    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.listProgress, {
          toValue: 100,
          duration: 300,
        }),
  
        Animated.timing(this.state.listOpacity, {
          toValue: 0,
          duration: 300,
        }),
      ]),

      Animated.timing(this.state.userInfoProgress, {
        toValue: 100,
        duration: 500,
      }),
    ]).start(() => {
      this.setState({ 
        userInfoVisible: true,
      });
    });
  }

  renderDetail = () => (
    <View>
      <User
        user={this.state.userSelected}
        onPress={() => {}}
      />
    </View>
  )

  renderList = () => (
    <Animated.View 
        style={[
          styles.container,
          { 
            transform: [
              { translateX: this.state.listProgress.interpolate({
                inputRange: [0, 100],
                outputRange: [0, width],
              })}
            ],
          },
          { opacity: this.state.listOpacity },
        ]}>
      <ScrollView
        onScrollBeginDrag={() => { this.setState({ scrollStarted: true }) }}
        onScroll={Animated.event([{ 
          nativeEvent: {
            contentOffset: { y: this.state.scrollOffset }
          } 
        }])}
        scrollEventThrottle={16}
      >
        { this.state.users.map(user =>
          <User
            key={user.id}
            user={user}
            onPress={() => this.selectUser(user)}
          />
        )}
      </ScrollView>
    </Animated.View>
  )

  render() {
    const { userSelected } = this.state;
    
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Animated.View 
          style={[
            styles.header,
            {
              height: this.state.scrollStarted ? this.state.scrollOffset.interpolate({
                inputRange: [0, 140],
                outputRange: [200, 70],
                extrapolate: 'clamp',
              }) : this.state.scrollOffset,
            }
          ]}
        >
          <Animated.Image
            style={[
              styles.headerImage,
              { 
                opacity: this.state.userInfoProgress.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
              }
            ]}
            source={userSelected ? { uri: userSelected.thumbnail } : null}
          />

          <Animated.Text 
            style={[
              styles.headerText,
              {
                fontSize: this.state.scrollStarted ? this.state.scrollOffset.interpolate({
                  inputRange: [120, 140],
                  outputRange: [24, 16],
                  extrapolate: 'clamp',
                }) : 24,
                transform: [{
                  translateX: this.state.userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, width],
                  }),
                }]
              }
            ]}>
            Animations
          </Animated.Text>

          <Animated.Text 
            style={[
              styles.headerText,
              {
                transform: [{
                  translateX: this.state.userInfoProgress.interpolate({
                    inputRange: [0, 100],
                    outputRange: [width * -1, 0],
                  }),
                }]
              }
            ]}>
            { userSelected ? userSelected.name : null }
          </Animated.Text>
          
        </Animated.View>

        { this.state.userInfoVisible
          ? this.renderDetail()
          : this.renderList() }
      </View>
    );
  }
}
