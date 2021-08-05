import Photos from '../../models/Photos';
import {
  SET_PHOTOS,
  CREATE_PHOTOS,
  UPDATE_PHOTOS,
  DELETE_PHOTOS,
} from '../actions/photo-actions';

const initialState = {
  listOfPhotos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        listOfPhotos: state.listOfPhotos.concat(action.listPhotos),
      };
    case DELETE_PHOTOS:
      return {
        ...state,
        listOfPhotos: state.listOfPhotos.filter(
          photoId => photoId !== action.photosId,
        ),
      };
    // case CREATE_CAKES:
    //   const newCakes = new Cake(
    //     action.newListOfCakes.id,
    //     action.newListOfCakes.title,
    //     action.newListOfCakes.image,
    //   );
    //   return {
    //     ...state,
    //     listOfCakes: state.listOfCakes.concat(newCakes),
    //   };
  }
  return state;
};
