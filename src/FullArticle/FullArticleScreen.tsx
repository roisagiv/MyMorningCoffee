import { Provider as MobxProvider } from "mobx-react";
import React from "react";
import { Navigation } from "react-native-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { INewsItem, INewsStore } from "../Models";
import store from "../Models/RootStore";
import { DefaultTheme } from "../Theme/DefaultTheme";
import Toolbar from "./Components/Toolbar";
import FullArticleContainer from "./FullArticleContainer";

interface IProps {
  componentId?: string;
  newsItem?: INewsItem;
}

export class FullArticleScreen extends React.Component<IProps, {}> {
  public render() {
    const s: INewsStore = store;
    const item = this.props.newsItem;
    return (
      <MobxProvider store={s}>
        <PaperProvider theme={DefaultTheme}>
          <Toolbar
            title={item.source.name}
            subtitle={item.title}
            onBack={this.onBackPress}
          />
          <FullArticleContainer item={item} />
        </PaperProvider>
      </MobxProvider>
    );
  }

  private onBackPress = () => {
    Navigation.pop(this.props.componentId, {});
  };
}
