
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNativeControls } from "../hooks/useNativeControls";
import MusicControl, { Command } from 'react-native-music-control'
import Video, { OnProgressData } from 'react-native-video';


export const VideoPlayerScreen = () => {
  const onProgressDataRef = useRef<OnProgressData>();
  const [paused, setPaused] = useState(true);
  const [areControlsSetup, setAreControlsSetup] = useState(false);
  const { setupControls, updateState, isSetup } = useNativeControls();

  const onProgress = (data: OnProgressData) => {
    if (!areControlsSetup) {
      setupControls({
        title: "Im a videoooo",
        currentTime: data.currentTime,
        duration: data.playableDuration,
        onPlay: () => setPaused(false),
        onPause: () => setPaused(true),
      });
      setAreControlsSetup(true);
    }
    onProgressDataRef.current = data;
  }

  useEffect(() => {
    updateState({
      isPlaying: !paused,
      currentTime: onProgressDataRef.current?.currentTime ?? 0,
    })
  }, [paused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fullScreen} onPress={() => setPaused(paused => !paused)}>
        <Video
          source={require("../media/demoVideo.mp4")}
          paused={paused}
          style={styles.fullScreen}
          repeat={true}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch={'ignore'}
          onProgress={onProgress}
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
