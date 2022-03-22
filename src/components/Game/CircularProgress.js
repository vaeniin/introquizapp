import React, { useRef, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    TextInput,
    Animated,
    Easing,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

import { useGame } from '../contexts/GameProvider';
import { useSettings } from '../contexts/SettingsProvider';
import { calculateDuration, maxPoints } from '../utils/calculateDuration';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const { width, height } = Dimensions.get('window');

const CircularProgress = ({
    radius = height * 0.145,
    strokeWidth = height * 0.007,
}) => {
    const { colors } = useTheme();
    const {
        startAnimation,
        updatePoints,
        setGameOver,
        clearAudio,
    } = useGame();
    const { simultaneous, duration, setDuration } = useSettings();

    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;

    const circleRef = useRef();
    const inputRef = useRef();
    const animatedValue = useRef(new Animated.Value(maxPoints)).current;

    const animation = (duration) => {
        return (
            Animated.timing(animatedValue, {
                toValue: 0,
                duration,
                easing: Easing.linear,
                useNativeDriver: false
            })
        ) 
    };

    useEffect(() => {
        const anim = animation(duration);
        if (startAnimation) anim.start();
        else if (clearAudio) animatedValue.stopAnimation(v => {
            updatePoints(Math.round(v));
            setDuration(calculateDuration(simultaneous, v));
        });

        animatedValue.addListener(v => {
            if (circleRef.current) {
                const maxPerc = 100 * v.value / maxPoints;
                const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100;
                circleRef.current.setNativeProps({
                    strokeDashoffset
                });
            }

            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Math.round(v.value)}`
                });
            }

            if ( Math.round(v.value) <= 0 ) setGameOver(true);
        });

        return () => {
            animatedValue.removeAllListeners();
            anim.stop();
        };
    }, [startAnimation, clearAudio]);

    return (
        <View style={styles.container}>
            <Svg width={radius*2.1} height={radius*2} viewBox={`${5} ${-4} ${halfCircle*2} ${halfCircle*2}`}>
                <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                    <AnimatedCircle 
                        ref={circleRef}
                        cx='50%'
                        cy='50%'
                        stroke={colors.text}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill='transparent'
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={circleCircumference}
                        strokeLinecap='round'
                    />
                </G>
            </Svg>
            <AnimatedInput
                ref={inputRef}
                underlineColorAndroid='transparent'
                editable={false}
                defaultValue={maxPoints.toString()}
                style={[
                    StyleSheet.absoluteFillObject,
                    { fontSize: radius / 2, color: colors.text},
                    { fontWeight: '900', textAlign: 'center'},
                    { position: 'absolute', top: -height*0.36, left:-width*0.028 }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
});

export default CircularProgress;