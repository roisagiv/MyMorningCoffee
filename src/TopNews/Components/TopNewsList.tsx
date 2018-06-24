import { Observer } from "mobx-react";
import * as React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Divider } from "react-native-paper";
import ActivityIndicator from "../../Components/ActivityIndicator";
import { INewsItem } from "../../Models";
import { NewsItemModelState } from "../../Models/NewsItem";
import NewsItem from "./NewsItem";

interface IProps {
  news: INewsItem[];
  loading?: boolean;
  onPress?: (id: number) => void;
  onRenderItem?: (id: number) => void;
}

export default class TopNewsList extends React.Component<IProps> {
  public render() {
    const { news, loading } = this.props;

    if (loading) {
      return this.renderIndicator();
    }
    return (
      <FlatList
        data={news}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={this.renderItem}
      />
    );
  }

  private renderItem = (item: ListRenderItemInfo<INewsItem>) => {
    const newsItem = item.item;

    const { onRenderItem } = this.props;
    if (onRenderItem) {
      onRenderItem(newsItem.id);
    }

    return (
      <Observer>
        {() => (
          <NewsItem
            onPress={this.props.onPress}
            coverImage={newsItem.urlToImage}
            publishedAt={newsItem.publishedAt}
            source={newsItem.source}
            description={newsItem.description}
            loading={newsItem.state === NewsItemModelState.Progress}
            id={newsItem.id}
            title={newsItem.title}
          />
        )}
      </Observer>
    );
  };

  private keyExtractor = (item: INewsItem) => item.id.toString();

  private renderSeparator = () => <Divider />;

  private renderIndicator = () => {
    return <ActivityIndicator />;
  };
}
