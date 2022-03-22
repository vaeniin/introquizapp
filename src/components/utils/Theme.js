import { DefaultTheme } from '@react-navigation/native';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#fff',
        secondary: '#e31c79',
        secondaryRGBA: 'rgba(227, 28, 121, 0.5)',
        card: '#00313C',
        text: 'rgba(255,255,255,0.6)',
        playerOn: '#001d24',
        pressed: '#004d5e',
    },
    opacities: {
        primary: 0.6,
        player: 0.7,
    },
};
