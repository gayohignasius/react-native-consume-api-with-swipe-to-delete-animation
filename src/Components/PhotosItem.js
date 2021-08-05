import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  textContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  deleteContainer: {
    marginTop: 20,
    marginHorizontal: 10,
    height: 200,
    right: -10,
    backgroundColor: 'red',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

const CakesItem = props => {
  const rightSwipe = (progress, dragX) => {
    const Scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={props.onDeletePressed}
        activeOpacity={0.6}
        style={styles.deleteContainer}>
        <Animated.View
          style={{
            transform: [
              {
                scale: Scale,
              },
            ],
          }}>
          <Icon name="trash" size={16} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <TouchableOpacity
        style={styles.viewContainer}
        onPress={props.onDetailPressed}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.data.image}} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.title}>{props.data.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default CakesItem;
