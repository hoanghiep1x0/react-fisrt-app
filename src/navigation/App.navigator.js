import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import DrawerNavigator from "./DrawerNavigator";

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */

const navigatorTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        // prevent layout blinking when performing navigation
        background: 'transparent',
    },
};

/*
 * Navigation theming: https://reactnavigation.org/docs/en/next/themes.html
 */



export const AppNavigator = () => (
    <NavigationContainer theme={navigatorTheme}>
        <DrawerNavigator />
    </NavigationContainer>
);
