/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppNavigation from './src/navigations/AppNavigation';
import photosReducers from './src/redux/reducers/photo-reducers';

const rootReducers = combineReducers({
  photos: photosReducers,
});

const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
