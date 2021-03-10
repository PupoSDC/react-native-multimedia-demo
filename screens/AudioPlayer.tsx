import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';

const setup = async () => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    await TrackPlayer.add({
        id: 'trackId',
        url: require('../media/demoAudio.mp3'),
        title: 'Uno',
        artist: 'Pupito El Pedrito',
        artwork: require('../media/demoAudioArtwork.jpeg')
    });

    await TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
        ]
    });
};

const destroy = async () => {
    await TrackPlayer.stop();
    await TrackPlayer.destroy();
}

export const AudioPlayerScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setup();
        return () => {
            destroy();
        }
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title={isPlaying ? "stop" : "play"}
                onPress={() => setIsPlaying((isPlaying) => {
                    if (isPlaying) {
                        TrackPlayer.stop();
                    } else {
                        TrackPlayer.play();
                    }
                    return !isPlaying;
                })}
            />
        </View>
    )
}