import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Animated,
} from 'react-native';

import { useSongs } from '../contexts/SongsProvider';

import Gradient from './Gradient';
import Title from './Title';
import GameLayout from '../Game/GameLayout';
import Footer from './Footer';

const HomeScreen = ({ navigation }) => {

    const { colors } = useTheme();
    const { loading } = useSongs();

    const [showLoading, setShowLoading] = useState(true);

    const fadeLoading = useRef(new Animated.Value(1)).current;
    const fadeLayout = useRef(new Animated.Value(0)).current;

    const fade = (anim, toValue, after) => {
        Animated.timing(anim, {
          toValue,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
            if (showLoading) setShowLoading(false)
            if (after) after();
        });
    };

    useEffect(() => {
        if (!loading) fade(fadeLoading, 0, () => fade(fadeLayout, 1))
    }, [loading]);
    
    return (
        <View style={[styles.container, { backgroundColor: colors.card, }]}>
            <Gradient 
                colors={[colors.secondary, colors.card]}
                style={{ flex: 1 }}
            >
                <Title />
            </Gradient>
            {showLoading ? 
                <Animated.View
                    style={[styles.loader, { 
                        opacity: fadeLoading
                    }]}
                >
                    <ActivityIndicator loading={true} color={colors.secondaryRGBA} size={60} />
                </Animated.View>
            : 
                <GameLayout showLayout={fadeLayout}/>
            }
            <Gradient
                colors={[colors.card, colors.secondary]}
                style={{ flex: 1 }}
            >
                <Footer navigation={navigation} />
            </Gradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;