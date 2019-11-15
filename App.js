
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {
  HomeScreen,
  RoomScreen,
  AnswerScreen,
  DummyScreen,
} from './src/screens'

const RoomNavigator = createDrawerNavigator(
  {
    Room: { screen: RoomScreen },
    Dummy: {screen: DummyScreen}
  },
  {
    initialRouteName: 'Room',
    contentComponent: DummyScreen,
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Room: { screen: RoomNavigator},
    Answer: { screen: AnswerScreen }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    }
  }
);

const App = createAppContainer(MainNavigator);

export default App;