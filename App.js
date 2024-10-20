// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TestTakingDisplay from './src/screens/TestTakingDisplay';
import TestScreen from './src/screens/TestFilter';
import LoginScreen from './src/screens/LoginScreen';
import SeeAllPYQ from './src/screens/SeeAllPYQ';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
      <Stack.Screen
          name="Home"
          component={TestScreen}
          options={{ title: 'Home Page' }}
        />
        <Stack.Screen
          name="TestTaking"
          component={TestTakingDisplay}
          options={{ title: 'Tests Page' }}
        />
        <Stack.Screen
          name="seeall"
          component={SeeAllPYQ}
          options={{ title: 'All Questions Page' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
