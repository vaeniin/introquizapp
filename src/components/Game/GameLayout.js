import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Animated,
} from 'react-native';

import { useGame } from '../contexts/GameProvider';
import Player from './Player';
import CircularProgress from './CircularProgress';
import Points from './Points';
import GuessField from './GuessField';
import Win from './Win';
import GameOver from './GameOver';

const GameLayout = ({ showLayout }) => {

    const { gameOver, hasWon } = useGame();

    const [showGame, setShowGame] = useState(true);

    const fadeGame = useRef(new Animated.Value(1)).current;
    const fadeGameOver = useRef(new Animated.Value(0)).current;

    const fade = (anim, toValue, after) => {
      Animated.timing(anim, {
        toValue,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        if (after) after();
      });
    };

    useEffect(() => {
        if (gameOver || hasWon) fade(fadeGame, 0, () => setShowGame(false));
    }, [gameOver, hasWon]);

    useEffect(() => {
        if (!showGame) fade(fadeGameOver, 1); 
    }, [showGame]);

    const closeGameOver = () => {
        fade(fadeGameOver, 0, () => {
            setShowGame(true);
            fade(fadeGame, 1);
        });
    };

    return (
        <Animated.View style={[styles.container, { opacity: showLayout  }]}>
            {showGame &&
                <Animated.View style={[styles.container, {
                    opacity: fadeGame,
                }]}>
                    <Points />
                    <View style={styles.progress}>
                        <CircularProgress />
                        <Player />
                    </View>
                    <GuessField />
                </Animated.View>
            }
            {!showGame && gameOver &&
                <GameOver
                    opacity={fadeGameOver}
                    close={closeGameOver}
                />
            }
            {!showGame && hasWon &&
                <Win
                    opacity={fadeGameOver}
                    close={closeGameOver}
                />
            }
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 5,
    },
    progress: {
        flex: 4,
        alignItems:'center',
        justifyContent: 'center',
      }
});

export default GameLayout;