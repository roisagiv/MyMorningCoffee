import { inject, observer } from "mobx-react";
import React from "react";
import { Navigation } from "react-native-navigation";
import { Screens } from "../Screens";
import { INewsStore } from "../TopNews/Models/NewsStore";
import TopNewsList from "./Components/TopNewsList";

interface IProps {
  store?: INewsStore;
  onNewsItemPress?: () => void;
}

class TopNewsListContainer extends React.Component<IProps, {}> {
  public render() {
    const { store, onNewsItemPress } = this.props;
    return (
      <TopNewsList
        news={store.items}
        loading={store.loading}
        onPress={onNewsItemPress}
      />
    );
  }
}

export default inject(allStores => allStores)(observer(TopNewsListContainer));
