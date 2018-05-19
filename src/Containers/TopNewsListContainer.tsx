import { inject, observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import TopNewsList from "../Components/TopNewsList";
import { INewsStore } from "../Models/NewsStore";

interface IProps {
  store?: INewsStore;
}

class TopNewsListContainer extends React.Component<IProps, {}> {
  public async componentDidMount() {
    const { store } = this.props;
    await store.fetch();
  }

  public render() {
    const { store } = this.props;
    return <TopNewsList news={store.items} loading={store.loading} />;
  }
}

export default inject(allStores => allStores)(observer(TopNewsListContainer));
