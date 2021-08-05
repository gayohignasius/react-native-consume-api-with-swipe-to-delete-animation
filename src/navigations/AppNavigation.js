import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import NewScreen from '../screens/NewScreen';
import AddNewScreen from '../screens/AddNewScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerTitle: 'Detail Photo',
          }}
        />
        <Stack.Screen
          name="AddNewScreen"
          component={AddNewScreen}
          options={{
            headerTitle: 'Add Photo',
          }}
        />
        {/* <Stack.Screen name="NewScreen" component={NewScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
