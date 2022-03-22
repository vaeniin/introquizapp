import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import { useGame } from '../contexts/GameProvider';

const GuessField = () => {

    const { colors } = useTheme();
    const { editable, guess, setGuess } = useGame();

    return (
        <View style={styles.container}>
            <TextInput  
                style={[styles.input, {
                    borderBottomColor: 'rgba(255,255,255,0.6)',
                    color: colors.text,
                }]} 
                autoCorrect={false} 
                keyboardType='visible-password'
                editable={editable}
                placeholder={editable ? 'Guess here...' : ''}
                placeholderTextColor={colors.text}
                value={guess}
                onChangeText={setGuess}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    input: {
        width: '70%',
        fontSize: 15,
        borderBottomWidth: 3,
    }
});

export default GuessField;