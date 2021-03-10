import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
import { AudioPlayerScreen } from './screens/AudioPlayer';
import { VideoPlayerScreen } from './screens/VideoPlayer';
import { HomeScreen } from "./screens/Home";

type RootStackParamList = {
  Home: undefined;
  Video:  undefined;
  Audio: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App : FunctionComponent = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Video" component={VideoPlayerScreen} />
        <RootStack.Screen name="Audio" component={AudioPlayerScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;