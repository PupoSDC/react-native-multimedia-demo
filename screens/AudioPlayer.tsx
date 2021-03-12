import React, { useEffect, useRef, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { default as SoundPlayer } from 'react-native-sound-player'
import { useNativeControls } from '../hooks/useNativeControls';



export const AudioPlayerScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { setupControls, updateState, isSetup } = useNativeControls();
    
    useEffect(() => {
        SoundPlayer.loadUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")

        setupControls({
            title: "im an audiooooo",
            currentTime: 0,
            duration: 251,
            onPlay: () => setIsPlaying(true),
            onPause: () => setIsPlaying(false),
        });
        return () => SoundPlayer.stop();
    }, []);

    useEffect(() => {
        if (isPlaying) {
            SoundPlayer.play();
        } else {
            SoundPlayer.pause();
        }
        updateState({
          isPlaying,
          currentTime: playerRef.current?.currentTime ?? 0,
        })
      }, [isPlaying]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title={isPlaying ? "stop" : "play"}
                onPress={() => setIsPlaying((isPlaying) => !isPlaying)}
            />
        </View>
    )
}