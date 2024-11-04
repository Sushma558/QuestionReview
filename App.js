// App.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import TestTakingDisplay from './src/screens/TestTakingDisplay';
// import TestScreen from './src/screens/TestFilter';
// import LoginScreen from './src/screens/LoginScreen';
import TestScheduleScreen from './src/screens/TestScheduleScreen';
import QuestionDisplay from './src/screens/QuestionDisplay';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        /> */}
        {/* <Stack.Screen
          name="Home"
          component={TestScreen}
          options={{ title: 'Home Page' }}
        />
        <Stack.Screen
          name="TestTaking"
          component={TestTakingDisplay}
          options={{ title: 'Tests Page' }}
        /> */}
        <Stack.Screen
          name="TestScheduleScreen"
          component={TestScheduleScreen}
          options={{title: 'Tests Schedule Page', headerTitleAlign: 'center'}}
        />
        <Stack.Screen
          name="QuestionDisplay"
          component={QuestionDisplay}
          options={{title: 'Questions', headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
