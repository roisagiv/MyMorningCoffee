import { Provider as MobxProvider } from "mobx-react";
import React from "react";
import { Navigation } from "react-native-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { INewsItem, INewsStore } from "../Models";
import store from "../Models/RootStore";
import { Screens } from "../Screens";
import { DefaultTheme } from "../Theme/DefaultTheme";
import Toolbar from "./Components/Toolbar";
import TopNewsListContainer from "./TopNewsListContainer";

interface IProps {
  componentId?: string;
}
export class TopNewsListScreen extends React.Component<IProps, {}> {
  public render() {
    const s: INewsStore = store;
    return (
      <MobxProvider store={s}>
        <PaperProvider theme={DefaultTheme}>
          <Toolbar title="Top News" onDevModePress={this.onDevModePress} />
          <TopNewsListContainer
            onNewsItemPress={this.onNewsItemPress}
            {...this.props}
          />
        </PaperProvider>
      </MobxProvider>
    );
  }

  private onDevModePress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: Screens.storybook.id,
        name: Screens.storybook.name
      }
    });
  };

  private onNewsItemPress = (id: number) => {
    const item = store.newsItemById(id);

    Navigation.push(this.props.componentId, {
      component: {
        id: Screens.fullArticle.id,
        name: Screens.fullArticle.name,
        passProps: { newsItem: item }
      }
    });
  };
}
