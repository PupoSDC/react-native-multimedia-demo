import React, { useEffect, useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { Text } from 'react-native';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import { useNativeControls } from '../hooks/useNativeControls';

export const AudioPlayerScreen = () => {
    const playerRef = useRef<Player>();
    const [isPlaying, setIsPlaying] = useState(false);
    const { setupControls, updateState, isSetup } = useNativeControls();
    
    useEffect(() => {
        playerRef.current = new Player("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
        setupControls({
            title: "im an audiooooo",
            currentTime: 0,
            duration: 251,
            onPlay: () => setIsPlaying(true),
            onPause: () => setIsPlaying(false),
        });
        return () => playerRef.current?.destroy();
    }, []);

    useEffect(() => {
        if (isPlaying) {
            playerRef.current?.play();
        } else {
            playerRef.current?.pause();
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