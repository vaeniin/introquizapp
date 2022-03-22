import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Pressable,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';

import { useSettings } from '../contexts/SettingsProvider';
import { useGame } from '../contexts/GameProvider';

const { height } = Dimensions.get('window');

const Player = () => {

    const { colors, opacities } = useTheme();
    const { audioTime } = useSettings();
    const {
        setEditable,
        setStartAnimation,
        songs,
        clearAudio,
        setClearAudio,
        gameOver,
        setFirstPlay,
    } = useGame();

    const [isPlaying, setIsPlaying] = useState(false);

    let timeOut;
    const audio = useRef([new Audio.Sound(), new Audio.Sound(), new Audio.Sound(), new Audio.Sound()]).current;

    useEffect(() => {
        if (clearAudio || gameOver) {
            (async () => {
                for (let j = 0; j < songs.length; j++) {
                    await audio[j].unloadAsync();
                }

                setClearAudio(false);
                setIsPlaying(false);

            })();
        }
    }, [clearAudio, gameOver]);

    const playSounds = async () => {
        setIsPlaying(true);

        let l = audio.filter(e => e._loaded === true).length;

        if (l < songs.length) {
            for (let j = 0; j < songs.length; j++) {
                try {
                    await audio[j].loadAsync(
                        { uri:  songs[j].uri }
                    );
                } catch (e) {
                    continue;
                }
            }
        }

        l = audio.filter(e => e._loaded === true).length;
        if (l < songs.length) setIsPlaying(false);
        else {
            for (let j = 0; j < songs.length; j++) {
                await audio[j].setPositionAsync(songs[j].position);
                await audio[j].playAsync();
            }

            setEditable(true);

            if (!clearAudio) {
                timeout = setTimeout(async () => {
                    for (let j = 0; j < songs.length; j++) {
                        await audio[j].stopAsync();
                    }
                    setIsPlaying(false);
                    setStartAnimation(true);
                    if (timeOut) clearTimeout(timeOut);
                }, audioTime);
            }
        }
    }

    const startGame = () => {
        if (songs.length > 0) {
            playSounds();
            setFirstPlay(false);
        }
    };

    return (
        <Pressable
            style={styles.container}
            onPress={isPlaying ? () => {} : startGame}
        >
            <Ionicons
                name='ios-play-circle'
                size={height * 0.29}
                color={isPlaying ? colors.playeron : colors.secondary}
                style={{ opacity: isPlaying ? 1 : opacities.player }}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'transparent'
    },
});

export default Player;