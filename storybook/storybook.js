/* eslint-disable global-require */
import { configure, getStorybookUI, addDecorator } from '@storybook/react-native';
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Button, Provider as PaperProvider } from "react-native-paper";
import { loadStories } from './storyLoader';


addDecorator(story => (
    <PaperProvider>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#F5FCFF',
        }}>
            {story()}
        </View>
    </PaperProvider>
));

// import stories
configure(() => {
    loadStories();
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: false });

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends Component {
    render() {
        return <StorybookUIRoot />;
    }
}

AppRegistry.registerComponent('MyMorningCoffee', () => StorybookUIHMRRoot);
export default StorybookUIHMRRoot;