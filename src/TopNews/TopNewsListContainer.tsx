import { inject, observer } from "mobx-react";
import React from "react";
import { INewsItem, INewsStore } from "../Models";
import TopNewsList from "./Components/TopNewsList";

interface IProps {
  store?: INewsStore;
  onNewsItemPress?: (item: INewsItem) => void;
}

class TopNewsListContainer extends React.Component<IProps, {}> {
  public render() {
    const { store, onNewsItemPress } = this.props;
    return (
      <TopNewsList
        news={store.news}
        loading={store.loading}
        onPress={onNewsItemPress}
      />
    );
  }
}

export default inject(allStores => allStores)(observer(TopNewsListContainer));
