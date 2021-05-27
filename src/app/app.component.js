import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppLoadinged, LoadFontsTask } from './app-loading.component';
import { appMappings, appThemes } from './app-theming';
import { AppIconsPack } from './app-icons-pack';
import { AppNavigator } from '../navigation/App.navigator.js';
import { Theming } from '../services/theme.service';
import { AppStorage } from '../services/app-storage';
import * as Font from 'expo-font';

const loadingTasks = [
    () => LoadFontsTask({
        'opensans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
        'roboto-regular': require('../assets/fonts/roboto-regular.ttf'),
    }),
    () => AppStorage.getMapping(defaultConfig.mapping).then(result => ['mapping', result]),
    () => AppStorage.getTheme(defaultConfig.theme).then(result => ['theme', result]),
];

const defaultConfig = {
    mapping: 'eva',
    theme: 'light',
};



const AppLOADED = ({ mapping, theme }) => {

    const [mappingContext, currentMapping] = Theming.useMapping(appMappings, mapping);
    const [themeContext, currentTheme] = Theming.useTheming(appThemes, mapping, theme);
    return (
        <React.Fragment>
            <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
            <AppearanceProvider>
                <ApplicationProvider {...currentMapping} theme={currentTheme}>
                    <Theming.MappingContext.Provider value={mappingContext}>
                        <Theming.ThemeContext.Provider value={themeContext}>
                            <SafeAreaProvider>
                                {/* <StatusBar /> */}
                                <AppNavigator />
                            </SafeAreaProvider>
                        </Theming.ThemeContext.Provider>
                    </Theming.MappingContext.Provider>
                </ApplicationProvider>
            </AppearanceProvider>
        </React.Fragment>
    );
};


export default class App extends React.Component {

    state = {
        fontsLoaded: false,
    };

    async loadFonts() {

        await LoadFontsTask({
            // Load a font `Montserrat` from a static resource
            'opensans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
            'roboto-regular': require('../assets/fonts/roboto-regular.ttf')
        });
        
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this.loadFonts();
    }

    render() {
        // Use the font with the fontFamily property after loading
        if (this.state.fontsLoaded) {
            return (
                <AppLoadinged
                    tasks={loadingTasks}
                    initialConfig={defaultConfig}>
                    {props => <AppLOADED {...props} />}
                </AppLoadinged>
            )
        } else {
            return null;
        }
    }
}