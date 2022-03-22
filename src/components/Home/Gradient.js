import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Gradient = ({ colors, style, children }) => {
    return (
        <LinearGradient
            colors={colors}
            style={style}
        >
            {children}
        </LinearGradient>
    );
};

export default Gradient;