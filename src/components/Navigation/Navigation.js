import React from 'react';
import RNBootSplash from "react-native-bootsplash";
import { NavigationContainer } from '@react-navigation/native';

import { theme } from '../utils/Theme';
import { DrawerNavigator } from './DrawerNavigator';

const Navigation = () => {
    return (
        <NavigationContainer theme={theme} onReady={() => setTimeout(() => RNBootSplash.hide({ fade: true }), 2000)}>
            <DrawerNavigator />
        </NavigationContainer>
    );
};

export default Navigation;