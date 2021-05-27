import React from 'react';
import { Appearance, AppearancePreferences, ColorSchemeName } from 'react-native-appearance';
import { AppStorage } from './app-storage';


export const Theming = {

    Mapping: 'eva' | 'material',

    Theme: 'light' | 'dark' | 'brand',

    MappingContext: React.createContext(null),

    ThemeContext: React.createContext(null),

    useMapping: (mappings, mapping) => {

        /**
         * Currently, there is no way to switch during the run time,
         * so the Async Storage and Expo Updates is used.
         *
         * Writes mapping to AsyncStorage and reloads an app
         */
        const setCurrentMapping = (nextMapping) => {
            AppStorage.setMapping(nextMapping);
        };

        const isEva = () => {
            return mapping === 'eva';
        };

        const mappingContext = {
            currentMapping: mapping,
            setCurrentMapping,
            isEva,
        };

        return [mappingContext, mappings[mapping]];
    },


    useTheming: (themes, mapping, theme) => {

        const [currentTheme, setCurrentTheme] = React.useState(theme);

        React.useEffect(() => {
            const subscription = Appearance.addChangeListener((preferences) => {
                const appearanceTheme = Theming.createAppearanceTheme(
                    preferences.colorScheme,
                    theme,
                );
                setCurrentTheme(appearanceTheme);
            });

            return () => subscription.remove();
        }, []);

        const isDarkMode = () => {
            return currentTheme === 'dark';
        };

        const createTheme = (upstreamTheme) => {
            return { ...themes[mapping][currentTheme], ...themes[mapping][upstreamTheme][currentTheme] };
        };

        const themeContext = {
            currentTheme,
            setCurrentTheme: (nextTheme) => {
                AppStorage.setTheme(nextTheme);
                setCurrentTheme(nextTheme);
            },
            isDarkMode,
            createTheme,
        };

        return [themeContext, themes[mapping][currentTheme]];
    },

    useTheme: (upstreamTheme) => {
        const themeContext = React.useContext(Theming.ThemeContext);
        return themeContext.createTheme(upstreamTheme);
    },

    createAppearanceTheme: (appearance,
        preferredTheme) => {
        if (appearance === 'no-preference') {
            return preferredTheme;
        }
        return appearance;
    }

}