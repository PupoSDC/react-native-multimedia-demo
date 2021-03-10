import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MusicControl, {Command} from 'react-native-music-control';
import Video, {OnProgressData} from 'react-native-video';

const App = () => {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    MusicControl.enableBackgroundMode(true);
    MusicControl.setNowPlaying({});
    MusicControl.enableControl(Command.play, true);
    MusicControl.enableControl(Command.play, true);
    MusicControl.on(Command.play, () => setPaused(false));
    MusicControl.on(Command.pause, () => setPaused(true));
  }, []);

  const onProgress = (data: OnProgressData) => {
    MusicControl.updatePlayback({
      state: paused ? MusicControl.STATE_PAUSED : MusicControl.STATE_PLAYING,
      elapsedTime: data.currentTime,
      title: 'demo video',
      artist: 'Pedrito el Pupito',
      duration: data.playableDuration,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fullScreen}
        onPress={() => setPaused((paused) => !paused)}>
        <Video
          source={require('./demoVideo.mp4')}
          paused={paused}
          style={styles.fullScreen}
          repeat={true}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch={'ignore'}
          onProgress={onProgress}
          // @ts-ignore Required for compatibility with native controls
          mixWithOthers="mix"
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default App;