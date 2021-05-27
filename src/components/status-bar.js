import React from 'react';
import {
    StatusBar as RNStatusBar,
    StatusBarProps as RNStatusBarProps,
    ViewProps,
} from 'react-native';
import { styled, StyledComponentProps } from '@ui-kitten/components';



class StatusBar extends React.Component {
    render() {
        const { eva, ...statusBarProps } = this.props;

        return (
            <RNStatusBar
                {...eva?.style}
                {...statusBarProps}
            />
        );

    }
}

export { StatusBar }