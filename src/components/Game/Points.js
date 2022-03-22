import React, { useRef, useEffect }from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Animated,
    TextInput,
    StyleSheet,
} from 'react-native';

import { useGame } from '../contexts/GameProvider';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Points = ({
    duration = 1000,
    style,
}) => {
    const { colors } = useTheme();
    const { points } = useGame();
    const inputRef = useRef();
    const animatedValue = useRef(new Animated.Value(0)).current;

    const animation = (toValue) => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            useNativeDriver: false
        }).start();
    };

    useEffect(() => {
        animation(points);

        animatedValue.addListener(v => {
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}`
                });
            }
        });

        return () => {
            animatedValue.removeAllListeners();
        };
    }, [points]);

    return (
        <View style={[styles.container, { ...style }]}>
            <AnimatedInput 
                editable={false}
                ref={inputRef}
                style={[styles.points, { color: colors.text }, { ...style }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems:'flex-end',
        justifyContent: 'center',
        paddingRight: '5%'
    },
    points: {
        fontSize: 25,
    }
});

export default Points;