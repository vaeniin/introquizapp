import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const Footer = ({ navigation }) => {

    const { colors } = useTheme();

    const openDrawer = () => navigation.openDrawer();

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                onPress={openDrawer}
            >
                <Ionicons 
                    name='md-menu'
                    size={height * 0.1} 
                    color={colors.text}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: '2%',
        paddingTop: '2%',
        justifyContent: 'center'
    },
});

export default Footer;