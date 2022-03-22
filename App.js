import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/components/Navigation/Navigation';
import { SettingsProvider } from './src/components/contexts/SettingsProvider';
import { GameProvider } from './src/components/contexts/GameProvider';
import { SongsProvider } from './src/components/contexts/SongsProvider';

const App = () => {
    return (
        <SongsProvider>
            <SettingsProvider>
                <GameProvider>
                    <Navigation />
                    <StatusBar />
                </GameProvider>
            </SettingsProvider>
        </SongsProvider>
    );
};

export default App;