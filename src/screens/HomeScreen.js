import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as photoActions from '../redux/actions/photo-actions';
import PhotosItem from '../Components/PhotosItem';
import {useCallback} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: '#3edbf0',
    bottom: 20,
    right: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
  },
  fabText: {
    color: 'white',
    fontSize: 20,
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

const HomeScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState();
  const photos = useSelector(state => state.photos.listOfPhotos);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(photoActions.fetchPhotos(currentPage));
  }, [dispatch, currentPage]);

  const onDetailPressed = (id, title, image) => {
    props.navigation.navigate('Detail', {
      photosId: id,
      photosTitle: title,
      photosUrl: image,
    });
  };

  const onAddNewPressed = id => {
    props.navigation.navigate('AddNewScreen');
  };

  const onDeletePressed = id => {
    Alert.alert('Warning!', 'Are you sure want to delete this item?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(photoActions.deletePhotos(id))},
    ]);
  };

  // const renderItem = ({item}) => {
  //   return (
  //     <Swipeable renderRightActions={rightSwipe}>
  //       <TouchableOpacity
  //         style={styles.viewContainer}
  //         onPress={() => onDetailPressed(item.id, item.title, item.image)}>
  //         <View style={styles.imageContainer}>
  //           <Image style={styles.image} source={{uri: item.image}} />
  //         </View>
  //         <View style={styles.textContainer}>
  //           <View style={styles.textRow}>
  //             <Text style={styles.title}>{item.title}</Text>
  //             <Text>{item.id}</Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     </Swipeable>
  //   );
  // };

  const handleMorePhotos = () => {
    setCurrentPage(currentPage + 1);
    setIsLoading(true);
  };

  const onRefresh = useCallback(async () => {
    setIsLoading(true);
    setCurrentPage(1);
    setError(null);
    try {
      await dispatch(photoActions.fetchPhotos(currentPage));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    setRefresh(false);
  }, [dispatch, currentPage, setIsLoading, setError, setCurrentPage]);

  const renderFooter = () => {
    return (
      <>
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#aaa" />
          </View>
        ) : null}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={onRefresh}
        refreshing={refresh}
        showsVerticalScrollIndicator={true}
        data={photos}
        // keyExtractor={item => item.id}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemData => (
          <PhotosItem
            image={itemData.item.image}
            title={itemData.item.title}
            onDetailPressed={() =>
              onDetailPressed(
                itemData.item.id,
                itemData.item.title,
                itemData.item.image,
              )
            }
            onDeletePressed={() => onDeletePressed(itemData.item.id)}
          />
        )}
        ListFooterComponent={renderFooter}
        onEndReached={handleMorePhotos}
        onEndReachedThreshold={0}
      />
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText} onPress={onAddNewPressed}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
