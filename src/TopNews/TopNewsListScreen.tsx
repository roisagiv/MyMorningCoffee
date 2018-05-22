import { Provider as MobxProvider } from "mobx-react";
import React from "react";
import { Navigation } from "react-native-navigation";
import { Provider as PaperProvider } from "react-native-paper";
import store from "../Models/RootStore";
import { Screens } from "../Screens";
import { DefaultTheme } from "../Theme/DefaultTheme";
import { INewsStore } from "../TopNews/Models/NewsStore";
import Toolbar from "./Components/Toolbar";
import TopNewsListContainer from "./TopNewsListContainer";

interface IProps {
  componentId?: string;
}
export class TopNewsListScreen extends React.Component<IProps, {}> {
  public async componentDidAppear() {
    const s: INewsStore = store;
    await s.fetch();
  }

  public render() {
    const s: INewsStore = store;
    return (
      <MobxProvider store={s}>
        <PaperProvider theme={DefaultTheme}>
          <Toolbar title="Top News" />
          <TopNewsListContainer onNewsItemPress={this.onNewsItemPress} />
        </PaperProvider>
      </MobxProvider>
    );
  }

  private onNewsItemPress = () => {
    Navigation.push(this.props.componentId, {
      component: {
        id: Screens.fullArticle.id,
        name: Screens.fullArticle.name
      }
    });
  };
}
