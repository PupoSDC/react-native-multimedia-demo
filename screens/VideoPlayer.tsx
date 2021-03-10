
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MusicControl, { Command } from 'react-native-music-control'
import Video, { OnProgressData } from 'react-native-video';


export const VideoPlayerScreen = () => {
  const onProgressDataRef = useRef<OnProgressData>();
  const [paused, setPaused] = useState(true);
  const [areControlsSetup, setAreControlsSetup] = useState(false);

  const setupControls = (data: OnProgressData) => {
    // fake start, necessary so we can stop the plugin safely
    MusicControl.enableBackgroundMode(true);
    MusicControl.handleAudioInterruptions(true);
    MusicControl.enableControl(Command.play, true);
    MusicControl.setNowPlaying({});
    MusicControl.updatePlayback(data); // you also need this or it wont work...

    setTimeout(() => {
      // The plugin doesn't work until we stop it at least once...
      // so we do it here.
      MusicControl.stopControl();
    }, 50);

    setTimeout(() => {
      console.log("setup!");
      // Real start.
      MusicControl.handleAudioInterruptions(true);
      MusicControl.enableBackgroundMode(true);
      MusicControl.enableControl(Command.play, true);
      MusicControl.enableControl(Command.pause, true);
      MusicControl.on(Command.play, () => setPaused(false));
      MusicControl.on(Command.pause, () => setPaused(true));
      MusicControl.setNowPlaying({
        title: "demo video",
        artist: "Pedrito el Pupito",
        duration: data.playableDuration, 
        elapsedTime: data.currentTime + 0.005,
        state: MusicControl.STATE_PLAYING,
        artwork: require("../media/demoVideoArtwork.jpg"),
      });
      MusicControl.updatePlayback({
        elapsedTime: data.currentTime + 0.005,
        state: MusicControl.STATE_PLAYING,
      });
    }, 100);
  }


  const onProgress = (data: OnProgressData) => {
    if (!areControlsSetup) {
      setupControls(data);
      setAreControlsSetup(true);
    }
    onProgressDataRef.current = data;
  }

  useEffect(() => {
    if (areControlsSetup) {
      console.log("update!");
      MusicControl.updatePlayback({
        elapsedTime: onProgressDataRef.current?.currentTime,
        state: paused ? MusicControl.STATE_PAUSED : MusicControl.STATE_PLAYING,
      });
    }
  }, [paused]);

  useEffect(() => () => {
    console.log("destroy!");
    MusicControl.updatePlayback({
      state: MusicControl.STATE_STOPPED,
      elapsedTime: 0,
    });
    MusicControl.stopControl();
  }, []);

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
          //controls={false}
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
