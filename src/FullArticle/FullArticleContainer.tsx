import { inject, observer } from "mobx-react";
import React from "react";
import ActivityIndicator from "../Components/ActivityIndicator";
import { INewsItem, INewsStore } from "../Models";
import WebView from "./Components/WebView";

interface IProps {
  item?: INewsItem;
}

class FullArticleContainer extends React.Component<IProps, {}> {
  public render() {
    const { item } = this.props;
    return (
      <WebView
        source={{ uri: item.url }}
        startInLoadingState={true}
        renderLoading={this.renderLoading}
      />
    );
  }

  private renderLoading = () => <ActivityIndicator />;
}

export default inject(allStores => allStores)(observer(FullArticleContainer));
