import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: '#F149',
  },
  
  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  
  headerText: {
    width: '100%',
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  },
});

export default styles;