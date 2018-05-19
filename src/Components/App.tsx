import { Provider as MobxProvider } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import TopNewsListContainer from "../Containers/TopNewsListContainer";
import createStore from "../Models/RootStore";

const store = createStore();

export default class App extends Component<{}> {
  public render() {
    return (
      <MobxProvider store={store}>
        <PaperProvider>
          <View style={styles.container}>
            <TopNewsListContainer />
          </View>
        </PaperProvider>
      </MobxProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0
  }
});
