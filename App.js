import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TestTakingDisplay from './src/screens/TestTakingDisplay';
import TestScreen from './src/screens/TestFilter';
import LoginScreen from './src/screens/LoginScreen';
import SeeAllPYQ from './src/screens/SeeAllPYQ';
import ScontiTeam from './src/screens/ScontiTeam';
import AddScreen from './src/screens/AddTestScreens/AddScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import AddUser from './src/screens/Home/AddUser';
import TeacherTracker from './src/screens/Home/TeacherTracker';
import PushTracker from './src/screens/Home/PushTracker';
import ReviewMainPage from './src/screens/Review/ReviewMainPage';
import QuestionReviewPage from './src/screens/Review/QuestionReviewPage';
import EditQuestionScreen from './src/screens/AddTestScreens/EditQuestionScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import {StyleSheet} from 'react-native';
import ReviewedQuestions from './src/screens/Home/ReviewedQuestions';
import {Icon} from 'react-native-elements';
import VisibilityOff from './src/assets/VisibilityOff';
import Home from './src/assets/Home';
import Review from './src/assets/Review';
import Add from './src/assets/Add';
import Event from './src/assets/Event';
import AddCardForReview from './src/screens/Home/AddCardForReview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarIcon: ({color, size}) => {
        //   let name;

        //   switch (route.name) {
        //     case 'Home':
        //       name = 'home';
        //       break;
        //     case 'Review':
        //       name = 'close';
        //       break;
        //     case 'Add':
        //       name = 'add';
        //       break;
        //     case 'Schedule':
        //       name = 'cancel';
        //       break;
        //     default:
        //       name = 'shield-person';
        //       break;
        //   }

        //   return <Icon name={name} color={color} size={size} />;
        //   // <Icon name={name} size={size} color={color} />
        // },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => <Home />,
        }}
      />
      <Tab.Screen
        name="Review"
        component={ReviewMainPage}
        options={{headerShown: true, tabBarIcon: () => <Review />}}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{headerShown: true, tabBarIcon: () => <Add />}}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{headerShown: true, tabBarIcon: () => <Event />}}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="push"
          component={TestScreen}
          options={{title: 'Push Page'}}
        />
        <Stack.Screen
          name="TestTaking"
          component={TestTakingDisplay}
          options={{title: 'Reviewed Question Page'}}
        />
        <Stack.Screen
          name="seeall"
          component={SeeAllPYQ}
          options={{title: ' See All Page'}}
        />
        <Stack.Screen
          name="sconti"
          component={ScontiTeam}
          options={{title: 'Sconti Team Approve Page'}}
        />
        <Stack.Screen
          name="add"
          component={AddScreen}
          options={{title: 'Add Question Page'}}
        />
        {/* <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{title: 'Home Page'}}
        /> */}
        <Stack.Screen
          name="adduser"
          component={AddUser}
          options={{title: 'Add User Page'}}
        />
        <Stack.Screen
          name="trackteacher"
          component={TeacherTracker}
          options={{title: 'Teaches Details Page'}}
        />
        <Stack.Screen
          name="trackpush"
          component={PushTracker}
          options={{title: 'Push Details Page'}}
        />
        <Stack.Screen
          name="reviewmainpage"
          component={ReviewMainPage}
          options={{title: 'Review Main Page'}}
        />
        <Stack.Screen
          name="questionreview"
          component={QuestionReviewPage}
          options={{title: 'Question Review Page'}}
        />

        <Stack.Screen
          name="edit"
          component={EditQuestionScreen}
          options={{title: 'Edit Question Page'}}
        />
        <Stack.Screen
          name="reviewedqns"
          component={ReviewedQuestions}
          options={{title: 'Reviewed Question Page'}}
        />
        <Stack.Screen
          name="addreviewcard"
          component={AddCardForReview}
          options={{title: 'Add card for review Page'}}
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
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBar: {
    height: 60,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
