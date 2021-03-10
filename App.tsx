import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Screen name="Home" component={HomeScreen} />
    </NavigationContainer>
  );
};

export default App;