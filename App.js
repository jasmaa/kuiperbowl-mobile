
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  RoomScreen,
  AnswerScreen,
} from './src/screens'

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Room: { screen: RoomScreen },
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