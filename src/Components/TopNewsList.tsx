import * as React from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { Divider, TouchableRipple } from "react-native-paper";
import { INewsItem } from "../Models/NewsItem";
import NewsItem from "./NewsItem";

interface IProps {
  news: INewsItem[];
  loading?: boolean;
}

const keyExtractor = (item: INewsItem) => item.url;

const renderItem = (item: ListRenderItemInfo<INewsItem>) => (
    <NewsItem newsItem={item.item} />
);

const renderSeparator = () => <Divider />;

const TopNewsList: React.SFC<IProps> = props => {
  const { news, loading } = props;
  if (loading) {
    return <View style={{ flex: 1, backgroundColor: "red" }} />;
  } else {
    return (
      <FlatList
        data={news}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
      />
    );
  }
};

export default TopNewsList;
