import { StackScreenProps } from '@react-navigation/stack';
import React, { FunctionComponent } from 'react';
import { Button, Text, View } from 'react-native';

export const HomeScreen : FunctionComponent<StackScreenProps<{}>>= ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Video Player"
          onPress={() => navigation.navigate('Video')}
        />
        <Button
          title="Go to Audio Player"
          onPress={() => navigation.navigate('Audio')}
        />
      </View>
    );
  }