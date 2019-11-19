
import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft, fromRight, fromTop, fromBottom, flipY } from 'react-navigation-transitions'

import { HomeScreen, RoomScreen, AnswerScreen, ProfileScreen, SettingsScreen } from './src/screens'


const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Room'
    && nextScene.route.routeName === 'Answer') {
    return fromTop();
  }
  else if (prevScene
    && prevScene.route.routeName === 'Answer'
    && nextScene.route.routeName === 'Room') {
    return fromBottom();
  }
  else if (prevScene
    && prevScene.route.routeName === 'Room'
    && nextScene.route.routeName === 'Profile') {
    return fromLeft();
  }
  else if (prevScene
    && prevScene.route.routeName === 'Profile'
    && nextScene.route.routeName === 'Room') {
    return fromRight();
  }
  else if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Settings') {
    return fromRight();
  }
  else if (prevScene
    && prevScene.route.routeName === 'Settings'
    && nextScene.route.routeName === 'Home') {
    return fromLeft();
  }

  return fromBottom();
}

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Room: { screen: RoomScreen },
    Profile: { screen: ProfileScreen },
    Answer: { screen: AnswerScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: (nav) => handleCustomTransition(nav)
  }
);

const App = createAppContainer(MainNavigator);

export default App;