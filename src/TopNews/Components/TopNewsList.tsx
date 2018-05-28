import * as React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Divider } from "react-native-paper";
import ActivityIndicator from "../../Components/ActivityIndicator";
import { INewsItem } from "../../Models";
import NewsItem from "./NewsItem";

interface IProps {
  news: INewsItem[];
  loading?: boolean;
  onPress?: (item: INewsItem) => void;
}

export default class TopNewsList extends React.Component<IProps> {
  public render() {
    const { news, loading } = this.props;

    if (loading) {
      return this.renderIndicator();
    } else {
      return (
        <FlatList
          data={news}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
        />
      );
    }
  }

  private renderItem = (item: ListRenderItemInfo<INewsItem>) => (
    <NewsItem newsItem={item.item} onPress={this.props.onPress} />
  );

  private keyExtractor = (item: INewsItem) => item.url;

  private renderSeparator = () => <Divider />;

  private renderIndicator = () => {
    return <ActivityIndicator />;
  };
}
