import React from 'react';

import * as Font from 'expo-font';


export const LoadFontsTask = async (fonts) => {


    await Font.loadAsync(fonts);

    // const message = [
    //     'There is no need to use this task in Bare RN Project.',
    //     'Use `react-native.config.js',
    //     'Documentation: https://github.com/react-native-community/cli/blob/master/docs/configuration.md',
    // ].join('\n');

    // console.warn(message);

    return Promise.resolve(null);
};

export const LoadAssetsTask = async (assets) => {


    const message = [
        'There is no need to use this task in Bare RN Project.',
        'Use `react-native.config.js',
        'Documentation: https://github.com/react-native-community/cli/blob/master/docs/configuration.md',
    ].join('\n');

    // console.warn(message);

    return Promise.resolve(null);
};

export const AppLoadinged = (props) => {

    const [loading, setLoading] = React.useState(true);
    const loadingResult = props.initialConfig || {};

    const onTasksFinish = () => {
        setLoading(false);
    };

    React.useEffect(() => {
        if (loading) {
            startTasks().then(onTasksFinish);
        }
    }, [loading]);

    const saveTaskResult = (result) => {
        if (result) {
            loadingResult[result[0]] = result[1];
        }
    };

    const createRunnableTask = (task) => {
        return task().then(saveTaskResult);
    };

    const startTasks = async () => {
        if (props.tasks) {
            return Promise.all(props.tasks.map(createRunnableTask));
        }
        return Promise.resolve();
    };

    return (
        <React.Fragment>
            {!loading && props.children(loadingResult)}
            {props.placeholder && props.placeholder({ loading })}
        </React.Fragment>
    );
};




