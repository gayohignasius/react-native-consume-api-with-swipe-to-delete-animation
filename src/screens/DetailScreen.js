import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    marginTop: 20,
    marginHorizontal: 10,
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
});

const DetailScreen = props => {
  const photosId = props.route.params.photosId;
  const selectedPhoto = useSelector(state =>
    state.photos.listOfPhotos.find(photo => photo.id === photosId),
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: selectedPhoto.image}} />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{selectedPhoto.title}</Text>
      </View>
    </View>
  );
};

export default DetailScreen;
