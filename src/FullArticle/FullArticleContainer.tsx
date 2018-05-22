import { inject, observer } from "mobx-react";
import React from "react";
import { WebView } from "react-native";
import { INewsStore } from "../TopNews/Models/NewsStore";

interface IProps {
  store?: INewsStore;
}

class FullArticleContainer extends React.Component<IProps, {}> {
  public render() {
    const { store } = this.props;
    return (
      <WebView source={{ uri: "https://github.com/facebook/react-native" }} />
    );
  }
}

export default inject(allStores => allStores)(observer(FullArticleContainer));
