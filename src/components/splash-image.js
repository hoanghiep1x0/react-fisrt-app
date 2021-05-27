import React, { useCallback, useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import { View, Image, Text } from "react-native";
import { Entypo } from '@expo/vector-icons';


const SplashImage = () => {

    var [appIsReady, setAppIsReady, animating, alignsecond] = useState(false);

    var [align] = useState('center');

    setTimeout(
        () => {
            align = 'flex-start';
            alignsecond = true;
        },
        3000
    );


    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                // await Font.loadAsync(Entypo.font);
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);


    if (!appIsReady) {
        return null;
    }

    return (


        <View
            style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: align,
                marginHorizontal: 40,
            }} onLayout={onLayoutRootView}>
            <Image
                source={require('../assets/images/image-splash.png',
                )}
                style={{ width: 100, height: 100 }}
            />
            {!alignsecond ? null : (
                <View style={{ margin: 10 }}>
                    <Text
                        style={{ color: '#114998', fontSize: 17, fontWeight: 'bold' }}>
                        Masak Lebih Mudah Dan Menyenangkan
                    </Text>
                </View>
            )}
        </View>

    );


}

export { SplashImage }