import React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View, Image } from 'react-native';

const Title = () => {

    const { opacities } = useTheme();

    return (
        <View style={styles.container}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={[styles.image, { opacity: opacities.primary }]}
              resizeMode='contain'
            />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '60%',
        height: '60%',
      }
});

export default Title;