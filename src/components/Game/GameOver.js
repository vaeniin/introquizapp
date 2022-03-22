import React, { useState, useRef } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    Text,
    Pressable,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';

import { useSettings } from '../contexts/SettingsProvider';
import { useGame } from '../contexts/GameProvider';
import Points from './Points';

const { height } = Dimensions.get('window');

const GameOver = ({ opacity, close }) => {

    const { colors, opacities } = useTheme();
    const { restart, songs } = useGame();
    const { audioTime } = useSettings();

    const [isPlaying, setIsPlaying] = useState(false);

    let timeout;
    const audio = useRef(new Audio.Sound()).current;

    const reset = () => {
        if(!audio._loaded){
            restart();
            close();
        }
    };

    const playSounds = async (song) => {
        setIsPlaying(true);
        try {
            await audio.loadAsync(
                { uri: song.uri }
            );
        } catch (e) {}

        await audio.setPositionAsync(song.position);
        await audio.playAsync();

        timeout = setTimeout(async () => {
            await audio.unloadAsync();
            setIsPlaying(false);
            if (timeout) clearTimeout(timeout);
        }, audioTime);
    }

    return (
        <Animated.View style={[styles.container, { backgroundColor: colors.card, opacity: opacity }]}>
            <Text style={[styles.title, { color: colors.text }]}>Game</Text>
            <Text style={[styles.title, { color: colors.text, marginBottom: '2%' }]}>Over</Text>
            <Points style={{ fontSize: 40, paddingRight: 0 }} />
            {songs.map((song, i) => 
                <Pressable
                    key={i}
                    onPress={isPlaying ? () => {} : () => playSounds(song)}
                    style={styles.song}
                >
                    {song.title.map((title, i) =>  
                        <Text 
                            key={'t'+i}
                            style={{ color: colors.text, fontSize: 17, marginRight: '1%' }}
                            numberOfLines={2}
                        >
                                {title}
                        </Text>
                    )}
                    <Ionicons
                        name='ios-play-circle'
                        size={height*0.036}
                        color={isPlaying ? colors.playeron : colors.secondary}
                        style={{ opacity: isPlaying ? 1 : opacities.player }}
                    />
                </Pressable>
            )}
            <Pressable
                style={({ pressed }) => [styles.button, { backgroundColor: pressed ? colors.pressed : 'transparent' }]}
                onPress={reset}
            >
                <Text style={[styles.title, { color: colors.text }, { fontSize: 20, marginVertical: 0 }]}>Try again</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: '5%',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 30,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        borderRadius: 25,     
        marginTop: '5%',
    },
    song: {
        flexDirection: 'row',
        marginVertical: '1%',
        paddingHorizontal: '5%',
        alignItems: 'center',
    },
});

export default GameOver;