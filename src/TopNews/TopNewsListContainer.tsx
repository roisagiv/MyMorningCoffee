import { inject, observer } from "mobx-react";
import React from "react";
import { INewsStore } from "../Models";
import TopNewsList from "./Components/TopNewsList";

interface IProps {
  store?: INewsStore;
  onNewsItemPress?: (id: number) => void;
}

class TopNewsListContainer extends React.Component<IProps, {}> {
  public render() {
    const { store, onNewsItemPress } = this.props;
    return (
      <TopNewsList
        news={store.news}
        loading={store.loading}
        onPress={onNewsItemPress}
        onRenderItem={this.onItemRender}
      />
    );
  }

  private onItemRender = (id: number) => {
    const { store } = this.props;
    store.expand(id);
  };
}

export default inject(allStores => allStores)(observer(TopNewsListContainer));
