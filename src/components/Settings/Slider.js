import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const Slider = ({ label, values, selected, setSelected }) => {
    
    const { colors } = useTheme();

    const size = Math.min(50, width/values.length);

    return (
        <>
            <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
            <View
                style={[styles.valuesContainer, {
                    borderColor: colors.secondary,
                    backgroundColor: colors.secondaryRGBA,
                    width: size*values.length,
                }]}
            >
                {values && values.map(value => 
                    <Pressable
                        key={value}
                        style={[styles.circle, {
                            width: size,
                            height: size,
                            backgroundColor: selected === value ? colors.secondary : 'transparent',
                            elevation: selected === value ? 2 : 0,
                        }]}
                        onPress={() => setSelected(value)}
                    >
                        <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
                    </Pressable>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    valuesContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 25,
        marginVertical: '5%',
    },
    circle: {
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    label: {
        fontSize: 15,
        marginTop: '5%',
    },
});

export default Slider;