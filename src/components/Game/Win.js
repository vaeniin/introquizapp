import React, { useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Dimensions,
    Pressable,
} from 'react-native';

import { useGame } from '../contexts/GameProvider';
import { getRandom } from '../utils/getRandom';
import Points from './Points';

const { width, height } = Dimensions.get('window');

const Win = ({ opacity, close }) => {

    const { colors } = useTheme();
    const { restart } = useGame();

    const movingBall =  new Animated.Value(0);

    const balls = [];
    
    const reset = () => {
        restart();
        close();
    };

    const animateBall = () => {
        Animated.timing(movingBall, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: false 
        }).start();
    };

    useEffect(() => {
        animateBall();
    }, []);

    for (let i = 0; i < 50; i++) {
        const top = movingBall.interpolate({
            inputRange: [0, 1],
            outputRange: [height * 0.25, getRandom(300)]
        });
        const left = movingBall.interpolate({
            inputRange: [0, 1],
            outputRange: [width * 0.4, getRandom(300)]
        });
        balls.push({
            top,
            left
        });
    }

    const ballOpacity = movingBall.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <Text style={[styles.title, { color: colors.text }]}>You win!</Text>
            <View style={styles.explosionBoundary}>
                {balls.map((ball, key) => {
                        return (
                            <Animated.View key={key} style={[styles.ball, {
                                top: ball.top,
                                left: ball.left,
                                backgroundColor: colors.secondary,
                                opacity: ballOpacity
                            }]} />
                        );
                    })}
            </View>
            <Points style={{ fontSize: 40, paddingRight: 0 }} />
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
        paddingTop: '15%',
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: '2%',
    },
    explosionBoundary: {
        position: 'absolute',
        height: height * 0.4,
        width: width * 0.8,
    },
    ball: {
        position: 'absolute',
        height: 6,
        width: 6,
        borderRadius: 3,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        borderRadius: 25,     
    },
});

export default Win;