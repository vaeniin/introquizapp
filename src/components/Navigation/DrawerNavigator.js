import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Settings from '../Settings/Settings';
import HomeScreen from '../Home/HomeScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props =>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem 
                        label={() => <Settings />}
                        pressColor='transparent'
                    />
                </DrawerContentScrollView>
            }
        >
            <Drawer.Screen name='Home' component={HomeScreen} />
        </Drawer.Navigator>
    );
};