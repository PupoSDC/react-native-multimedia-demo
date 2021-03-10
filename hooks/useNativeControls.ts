
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MusicControl, { Command } from 'react-native-music-control'
import Video, { OnProgressData } from 'react-native-video';

type SetupControlsProps = {
    title: string,
    currentTime: number,
    duration: number,
    onPlay: () => void,
    onPause: () => void,
}

type UpdateStateProps = {
    currentTime: number,
    isPlaying: boolean,
}

type UseNativeControlsType = () => {
    setupControls: (props: SetupControlsProps) => void;
    updateState: (props: UpdateStateProps) => void;
    isSetup: boolean;
}

export const useNativeControls: UseNativeControlsType = () => {
    const [isSetup, setIsSetup] = useState(false);

    useEffect(() => () => {
        if (isSetup) {
            console.log("destroy!");
            MusicControl.updatePlayback({
                state: MusicControl.STATE_STOPPED,
                elapsedTime: 0,
            });
            MusicControl.stopControl();
        }
    }, [isSetup]);

    const setupControls: (props: SetupControlsProps) => void = ({
        title,
        currentTime,
        duration,
        onPlay,
        onPause,
    }) => {
        setIsSetup(true);
        // fake start, necessary so we can stop the plugin safely
        MusicControl.enableBackgroundMode(true);
        MusicControl.handleAudioInterruptions(true);
        MusicControl.enableControl(Command.play, true);
        MusicControl.setNowPlaying({});

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
            MusicControl.on(Command.play, onPlay);
            MusicControl.on(Command.pause, onPause);
            MusicControl.setNowPlaying({
                title,
                artist: "Pedrito el Pupito",
                duration,
                elapsedTime: currentTime,
                state: MusicControl.STATE_PLAYING,
                artwork: require("../media/demoVideoArtwork.jpg"),
            });
            MusicControl.updatePlayback({
                elapsedTime: currentTime,
                state: MusicControl.STATE_PLAYING,
            });
        }, 100);
    }

    const updateState: (props: UpdateStateProps) => void = ({
        currentTime,
        isPlaying
    }) => {
        if (isSetup) {
            MusicControl.updatePlayback({
                elapsedTime: currentTime,
                state: isPlaying ? MusicControl.STATE_PLAYING : MusicControl.STATE_PAUSED,
            });
        }
    }

    return {
        isSetup,
        setupControls,
        updateState,
    }
}

