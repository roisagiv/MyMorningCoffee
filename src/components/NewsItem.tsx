import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        alignSelf: 'center',
    }
});
export default class NewsItem extends React.Component<{}, {}> {
    public render() {
        return (
            <View style={styles.root}>
                <Text>Hello</Text>
            </View>
        );
    }
}