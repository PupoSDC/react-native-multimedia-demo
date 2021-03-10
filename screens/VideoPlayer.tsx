
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import MusicControl, { Command } from 'react-native-music-control'
import Video, { OnProgressData } from 'react-native-video';


export const VideoPlayerScreen = () => {
  const [paused, setPaused] = useState(true);
  const [areControlsSetup, setAreControlsSetup] = useState(false);

  useEffect(() => {
    MusicControl.enableBackgroundMode(true);
    MusicControl.enableControl(Command.closeNotification, true, { when: 'always' });
    MusicControl.on(Command.play, () => setPaused(false));
    MusicControl.on(Command.pause, () => setPaused(true));
    return () => {
      console.log("stop control");
      MusicControl.stopControl();
    }
  }, [setPaused]);

  const setupControls = (data: OnProgressData)  => {
    if (!areControlsSetup) {
      MusicControl.setNowPlaying({
        title: "demo video",
        artist: "Pedrito el Pupito",
        duration: data.playableDuration, 
        elapsedTime: data.currentTime,
        artwork: require("../media/demoVideoArtwork.jpg"),
      });    
      MusicControl.enableControl(Command.play, true);
      MusicControl.enableControl(Command.pause, true);
      console.log("playing!!", data.playableDuration);   
    } 
  }

  return (
    <View style={styles.container}>
        <Video
          source={require("../media/demoVideo.mp4")}
          paused={paused}
          style={styles.fullScreen}
          repeat={true}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch={'ignore'}
          onProgress={setupControls}
          controls={true}
          // @ts-ignore Required for compatibility with native controls
          mixWithOthers="mix"
        />
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
