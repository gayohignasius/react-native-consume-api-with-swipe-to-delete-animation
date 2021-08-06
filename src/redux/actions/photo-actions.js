import {Alert} from 'react-native';
import Photos from '../../models/Photos';

export const SET_PHOTOS = 'SET_PHOTOS';
export const CREATE_PHOTOS = 'CREATE_PHOTOS';
export const UPDATE_PHOTOS = 'UPDATE_PHOTOS';
export const DELETE_PHOTOS = 'DELETE_PHOTOS ';

export const fetchPhotos = values => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        // `https://75a418ea-a346-4386-831e-c71106ceccc7.mock.pstmn.io/cakes?page=${values}`,
        `https://jsonplaceholder.typicode.com/albums/1/photos?_limit=5&_page=${values}`,
      );
      const resData = await response.json();
      const newListPhotos = [];
      for (const id in resData) {
        newListPhotos.push(
          new Photos(resData[id].id, resData[id].title, resData[id].url),
        );
      }
      dispatch({
        type: SET_PHOTOS,
        listPhotos: newListPhotos,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addPhotos = (title, imageUrl) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/photos',
      {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          url: imageUrl,
        }),
      },
    );

    const resData = await response.json();
    dispatch({
      type: CREATE_PHOTOS,
      newListOfPhotos: {
        id: resData.id,
        title,
        image: imageUrl,
      },
    });
  };
};

export const deletePhotos = id => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: DELETE_PHOTOS,
      photosId: id,
    });

    Alert.alert('Information', 'Item deleted', [
      {text: 'OK', onPress: () => console.log('OK')},
    ]);
  };
};
