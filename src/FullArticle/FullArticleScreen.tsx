import { Provider as MobxProvider } from "mobx-react";
import React from "react";
import { Navigation } from "react-native-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import store from "../Models/RootStore";
import { DefaultTheme } from "../Theme/DefaultTheme";
import { INewsStore } from "../TopNews/Models/NewsStore";
import Toolbar from "./Components/Toolbar";
import FullArticleContainer from "./FullArticleContainer";

interface IProps {
  componentId?: string;
}

export class FullArticleScreen extends React.Component<IProps, {}> {
  public async componentDidAppear() {
    const s: INewsStore = store;
    await s.fetch();
  }

  public render() {
    const s: INewsStore = store;
    return (
      <MobxProvider store={s}>
        <PaperProvider theme={DefaultTheme}>
          <Toolbar title="Article" onBack={this.onBackPress} />
          <FullArticleContainer />
        </PaperProvider>
      </MobxProvider>
    );
  }

  private onBackPress = () => {
    Navigation.pop(this.props.componentId, {});
  };
}
