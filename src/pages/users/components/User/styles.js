import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'column',
    marginHorizontal: 15,
  },
  
  thumbnail: {
    width: '100%',
    height: 150,
  },
  
  infoContainer: {
    backgroundColor: '#57BCBC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  
  bioContainer: {
    flex: 1,
  },
  
  name: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 10,
  },
  
  description: {
    color: '#FFF',
    fontSize: 13,
    marginTop: 2,
  },
  
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  
  likes: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default styles;