import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Platform,
  View
} from "react-native";
import { Divider } from "react-native-paper";
import { DefaultTheme } from "../../Theme/DefaultTheme";
import { INewsItem } from "../Models/NewsItem";
import NewsItem from "./NewsItem";

interface IProps {
  news: INewsItem[];
  loading?: boolean;
  onPress?: () => void;
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
    const isIOS = Platform.OS === "ios";

    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <ActivityIndicator
          size={isIOS ? "large" : 48}
          color={DefaultTheme.colors.text}
        />
      </View>
    );
  };
}
