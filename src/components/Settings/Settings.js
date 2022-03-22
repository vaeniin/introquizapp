import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { useSettings } from '../contexts/SettingsProvider';
import Slider from './Slider';

const Settings = () => {

    const { colors } = useTheme();
    const {
        simultaneous,
        section,
        reverse,
        setSimultaneous,
        setSection,
        setReverse,
    } = useSettings();

    return ( 
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text, marginBottom: '10%', }]}>Options</Text>
            <Slider
                selected={simultaneous}
                setSelected={setSimultaneous}
                values={[1, 2, 3, 4]}
                label='Number of simultaneous songs'
            />
            <Slider
                selected={section}
                setSelected={setSection}
                values={['intro', 'outro', 'rnd']}
                label='Section of songs'
            />
            <Slider
                selected={reverse}
                setSelected={setReverse}
                values={['off', 'on']}
                label='Reverse songs'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        textTransform: 'uppercase',
    },
});

export default Settings;