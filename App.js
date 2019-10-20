
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  RoomScreen,
  AnswerScreen,
} from './src/screens'

const MainNavigator = createStackNavigator(
  {
    Room: { screen: RoomScreen },
    Answer: { screen: AnswerScreen }
  },
  {
    initialRouteName: 'Room',
    headerMode: 'none'
  }
);

const App = createAppContainer(MainNavigator);

export default App;